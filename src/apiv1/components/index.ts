import { Router } from 'express';

import { AuthRoutes } from './auth/routes';
import { UserRoutes } from './user/routes';

export function registerApiRoutes(router: Router, prefix = ''): void {
	router.use(`${prefix}/auth`, new AuthRoutes().router);
	router.use(`${prefix}/users`, new UserRoutes().router);
}
