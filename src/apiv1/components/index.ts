import { Router } from 'express';

import { UserRoutes } from './user/routes';

export function registerApiRoutes(router: Router, prefix = ''): void {
	router.use(`${prefix}/users`, new UserRoutes().router);
}
