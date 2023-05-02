import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../user/repository';
import { UtilityService } from '../../../services/utility';
import { Prisma, User } from '@prisma/client';

export class AuthController {
	readonly userRepo: UserRepository = new UserRepository();
	@bind
	async signinUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { email, password } = req.body;
			const user = await this.userRepo.readByEmail(email);
			const isCorrectPassword: boolean = await UtilityService.verifyPassword(password, user.password);
			if (!user || !isCorrectPassword) {
				res.status(401).json({ status: 401, error: 'Wrong email or password' });
			}

			// Create a JWT token
			// Dont send user password in response
			delete user.password;
		} catch (error) {}
	}
}
