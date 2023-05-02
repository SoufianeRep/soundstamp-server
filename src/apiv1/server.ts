import express from 'express';

import { initApiRoutes } from './routes';

export class Server {
	readonly #app: express.Application = express();

	constructor() {
		initApiRoutes(this.#app);
	}

	/**
	 * Get Express app
	 *
	 * @returns {express.Application} Returns Express app
	 */
	get app(): express.Application {
		return this.#app;
	}
}
