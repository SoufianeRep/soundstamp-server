import { Router } from 'express';
import { UserController } from './controller';
import { AuthService } from '../../../services/auth';
// TODO
export class UserRoutes {
	readonly router: Router = Router();
	readonly controller: UserController = new UserController();
	authService: AuthService;

	constructor() {
		this.authService = new AuthService();
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get('/', this.controller.readUsers);
		this.router.post('/', this.controller.createUser);
	}
}
