import { Router } from 'express';
import { AuthService } from '../../../services/auth';
import { StudioController } from './controller';

export class StudioRoutes {
	readonly router: Router = Router();
	readonly studioController: StudioController = new StudioController();
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
			this.studioController.getAll,
		);

		this.router.get(
			'/:id',
			this.authService.validateRequest,
			this.authService.isAuthenticated,
			this.studioController.getStudio,
		);

		this.router.delete(
			'/:id',
			this.authService.validateRequest,
			this.authService.isAuthenticated,
			this.studioController.deleteStudio,
		);
	}
}
