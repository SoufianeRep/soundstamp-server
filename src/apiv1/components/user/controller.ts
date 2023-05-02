import { bind } from 'decko';
import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from './repository';
import { UtilityService } from '../../../services/utility';

export class UserController {
	readonly repo: UserRepository = new UserRepository();
	/**
	 * Get all the users
	 *
	 * @param req
	 * @param res
	 * @param next
	 * @returns
	 */
	@bind
	async readUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const users = await this.repo.readAllUsers();

			return res.json(users);
		} catch (error) {
			return next(error);
		}
	}

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 * @returns
	 */
	@bind
	async createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const user: User = req.body;

			const existingUser = await this.repo.readByEmail(user.email);
			if (existingUser) {
				return res.status(400).json({ error: 'Email is already taken' });
			}
			const hashedPassword = await UtilityService.hashPassword(req.body.password);
			user.password = hashedPassword;

			const newUser = await this.repo.createUser(user);
			return res.status(201).json(newUser);
		} catch (error) {
			return next(error);
		}
	}
}
