import { NextFunction, Request, Response, Router, json } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { AuthService } from '../../services/auth';

export function registerMiddleware(router: Router): void {
	router.use(cors());
	router.use(helmet());
	router.use(json());

	// Setup passport strategies
	new AuthService().initStrategies();

	// use conpression js
}

/**
 * Init Express error handler
 *
 * @param {Router} router
 * @returns {void}
 */
export function registerErrorHandler(router: Router): Response | void {
	router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		return res.status(500).json({
			status: 500,
			error: err.message || err,
			stack: err.stack,
		});
	});
}
