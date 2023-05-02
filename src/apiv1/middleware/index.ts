import { NextFunction, Request, Response, Router, json } from 'express';
import helmet from 'helmet';

export function registerMiddleware(router: Router): void {
	router.use(helmet());
	router.use(json());

	// Setup passport strategies
	// TODO
}

/**
 * Init Express error handler
 *
 * @param {Router} router
 * @returns {void}
 */
export function registerErrorHandler(router: Router): Response | void {
	router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		if (err && !err.message) {
			return res.status(500).json({
				error: err.message || err,
				status: 500,
			});
		}
	});
}
