import { Handler, NextFunction, Request, Response } from 'express';
import { authenticate } from 'passport';
import { Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import { PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'info', 'error'] });

export class JwtStrategy {
	#strategyOptions: StrategyOptions;
	_strategy: Strategy;

	constructor(strategyOptions: StrategyOptions) {
		this.#strategyOptions = strategyOptions;
		this._strategy = new Strategy(this.#strategyOptions, this.#verify);
	}

	isAuthorized(req: Request, res: Response, next: NextFunction): Handler | void {
		try {
			authenticate('jwt', { session: false }, (err: unknown, user: User, info: any) => {
				if (err) return next(err);

				if (info) {
					switch (info.message) {
						case 'No auth token':
							return res.status(401).json({ error: 'No token provided' });
						case 'jwt expired':
							return res.status(401).json({ error: 'Expired token' });
					}
				}

				if (!user) return res.status(401).json({ error: 'User is not authorized' });

				req.user = user;

				return next();
			})(req, res, next);
		} catch (error) {
			return next(error);
		}
	}

	async #verify(payload: any, next: VerifiedCallback): Promise<void> {
		try {
			const user = await prisma.user.findUnique({
				where: {
					id: payload.userID,
				},
			});

			if (!user) return next(null, null);

			// do something after verification

			return next(null, user);
		} catch (error) {
			return next(error);
		}
	}
}
