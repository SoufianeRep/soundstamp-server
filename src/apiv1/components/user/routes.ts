import { Router } from 'express';
import { UserController } from './controller';
import { AuthService } from '../../../services/auth';
// TODO
export class UserRoutes {
	readonly router: Router = Router();
	readonly userController: UserController = new UserController();
	authService: AuthService;

	constructor() {
		this.authService = new AuthService();
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.get(
			'/',
			this.authService.validateRequest,
			this.authService.isAuthenticated,
			this.userController.readUsers,
		);
		this.router.post(
			'/',
			this.authService.validateRequest,
			this.authService.isAuthenticated,
			this.userController.createUser,
		);

		this.router.get(
			'/:userID',
			this.authService.validateRequest,
			this.authService.isAuthenticated,
			this.userController.findUserByID,
		);
	}
}
