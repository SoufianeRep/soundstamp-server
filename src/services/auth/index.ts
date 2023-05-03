import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';

export class AuthService {
	readonly secret: string = process.env.SECRET;

	createToken(userID: number): string {
		return sign({ userID }, this.secret as string);
	}

	validateRequest(req: Request, res: Response, next: NextFunction): Response | void {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			res.status(400).json({ error: errors.array() });
		}

		return next();
	}
}
