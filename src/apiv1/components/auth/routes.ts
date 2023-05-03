import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from './controller';
import { AuthService } from '../../../services/auth';

export class AuthRoutes {
	readonly authController: AuthController = new AuthController();
	readonly router: Router = Router();
	authService: AuthService;

	constructor() {
		this.authService = new AuthService();
		this.initRoutes();
	}

	initRoutes(): void {
		this.router.post(
			'/signin',
			body('email').isEmail(),
			body('password').isString(),
			this.authService.validateRequest,
			this.authController.signinUser,
		);
	}
}
