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

			const existingUser = await this.repo.findByEmail(user.email);
			if (existingUser) {
				return res.status(400).json({ error: 'Email is already taken' });
			}
			const hashedPassword = await UtilityService.hashPassword(req.body.password);
			user.password = hashedPassword;

			const newUser = await this.repo.createUser(user);
			return res.status(201).json({ success: true, data: { user: newUser } });
		} catch (error) {
			return next(error);
		}
	}

	@bind
	async findUserByID(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const userId: number = +req.params.userID;

			const user = await this.repo.findByID(userId);
			if (!user) {
				return res.status(404).json({ success: false, data: { error: `Cant find user with id ${userId}` } });
			}

			return res.json({ success: true, data: { user } });
		} catch (error) {
			return next(error);
		}
	}
}
