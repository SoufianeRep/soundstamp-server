import { bind } from 'decko';
import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { UserRepository } from './repository';

export class UserController {
	readonly repo: UserRepository = new UserRepository();

	@bind
	async readUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const users = await this.repo.readAllUsers();

			return res.json(users);
		} catch (error) {
			return next(error);
		}
	}

	@bind
	async createUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const user: User = req.body;

			const existingUser = await this.repo.readByEmail(user.email);
			if (existingUser) {
				res.status(400).json({ error: 'Email is already taken' });
			}

			const newUser = await this.repo.createUser(user);
			res.status(201).json(newUser);
		} catch (error) {
			return next(error);
		}
	}
}
