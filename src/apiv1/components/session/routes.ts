import { Router } from 'express';
import { AuthService } from '../../../services/auth';
import { SessionController } from './constoller';

export class SessionRoutes {
	readonly router: Router = Router();
	readonly sessionController: SessionController = new SessionController();
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
			this.sessionController.getAllSessions,
		);

		this.router.get(
			'/studio/:id',
			this.authService.validateRequest,
			this.authService.isAuthenticated,
			this.sessionController.getSessionsByStudio,
		);

		this.router.post(
			'/',
			this.authService.validateRequest,
			this.authService.isAuthenticated,
			this.sessionController.createSession,
		);

		// Update a session with a given id
		this.router.post(
			'/:id',
			this.authService.validateRequest,
			this.authService.isAuthenticated,
			this.sessionController.updateSession,
		);

		// Delete a session with a given id
		this.router.delete(
			'/:id',
			this.authService.validateRequest,
			this.authService.isAuthenticated,
			this.sessionController.deleteSession,
		);
	}
}
