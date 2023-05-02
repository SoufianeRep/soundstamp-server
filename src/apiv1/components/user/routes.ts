import { Router } from 'express';
import { UserController } from './controller';
// TODO
export class UserRoutes {
	readonly router: Router = Router();
	readonly controller: UserController = new UserController();

	constructor() {
		this.initRoutes();
	}

	initRoutes(): void {
		console.log('user routes');

		this.router.get('/', this.controller.readUsers);

		this.router.post('/', this.controller.createUser);
	}
}
