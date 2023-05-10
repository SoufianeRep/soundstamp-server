import { bind } from 'decko';
import { env } from '../../config/globals';
import { Handler, NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { StrategyOptions, ExtractJwt } from 'passport-jwt';
import { SignOptions, sign } from 'jsonwebtoken';
import { JwtStrategy } from './strategies/jwt';
import { User } from '@prisma/client';
import passport from 'passport';

export type PassportStrategy = 'jwt';

export class AuthService {
	readonly secret: string = env.SECRET;
	// readonly #issuer: string = 'soundstamp-server';
	// readonly #audience: string = 'soundstamp-client';
	readonly defaultStrategy: PassportStrategy;
	readonly jwtStrategy: JwtStrategy;

	readonly #strategyOptions: StrategyOptions = {
		secretOrKey: env.SECRET,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		// issuer: this.#issuer,
		// audience: this.#audience,
	};

	readonly #signOptions: SignOptions = {
		expiresIn: '12h',
		// issuer: this.#issuer,
		// audience: this.#audience,
	};

	constructor(defaultStrategy: PassportStrategy = 'jwt') {
		this.defaultStrategy = defaultStrategy;
		this.jwtStrategy = new JwtStrategy(this.#strategyOptions);
	}

	createToken(userID: number, role: string): string {
		return sign({ userID, role }, this.secret as string, this.#signOptions);
	}

	validateRequest(req: Request, res: Response, next: NextFunction): Response | void {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(400).json({ error: errors.array() });
		}

		return next();
	}

	/**
	 * Init passport strategies
	 *
	 * @returns
	 */
	initStrategies(): void {
		passport.use('jwt', this.jwtStrategy.strategy);
	}

	/**
	 * Middleware for checking if a user is authorized to access the endpoint
	 *
	 * @param req Express request
	 * @param res Express response
	 * @param next Express next
	 * @returns Returns if user is authorized
	 */
	@bind
	isAuthenticated(req: Request, res: Response, next: NextFunction): Handler | void {
		try {
			passport.authenticate('jwt', { session: false }, (err: unknown, user: User, info: any) => {
				if (err) return next(err);

				if (info) {
					switch (info.message) {
						case 'No auth token':
							return res.status(401).json({ success: false, data: { error: 'No token provided' } });
						case 'jwt expired':
							return res.status(401).json({ success: false, data: { error: 'Expired token' } });
					}
				}

				if (!user) return res.status(401).json({ success: false, data: { error: 'User is not authorized' } });

				req.user = user;

				return next();
			})(req, res, next);
		} catch (error) {
			console.error(error);
			return next(error);
		}
	}
}
