import { Request, Response, Router } from 'express';
import { registerApiRoutes } from './components';
import { registerErrorHandler, registerMiddleware } from './middleware';

/**
 * Init Express REST routes
 *
 * @param {Router} router
 * @returns {void}
 */
export function initApiRoutes(router: Router): void {
	const prefix = '/api/v1';

	router.get(prefix, (req: Request, res: Response) => res.send('PING'));

	// routers
	registerMiddleware(router);
	registerApiRoutes(router, prefix);
	registerErrorHandler(router);
}
