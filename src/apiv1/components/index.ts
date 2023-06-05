import { Router } from 'express';

import { AuthRoutes } from './auth/routes';
import { UserRoutes } from './user/routes';
import { StudioRoutes } from './studio/routes';
import { SessionRoutes } from './session/routes';

export function registerApiRoutes(router: Router, prefix = ''): void {
	router.use(`${prefix}/auth`, new AuthRoutes().router);
	router.use(`${prefix}/users`, new UserRoutes().router);
	router.use(`${prefix}/studios`, new StudioRoutes().router);
	router.use(`${prefix}/sessions`, new SessionRoutes().router);
  
}
