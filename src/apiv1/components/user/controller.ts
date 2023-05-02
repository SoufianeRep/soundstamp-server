import { Request, Response, NextFunction } from 'express';
import { UserRepository } from './repository';

export class UserController {
	readonly repo: UserRepository = new UserRepository();

	async readUsers(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const users = await this.repo.readAllUsers();

			return res.json(users);
		} catch (error) {
			return next(error);
		}
	}
}
