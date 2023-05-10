import express from 'express';
import { Server } from './apiv1/server';
import { env } from './config/globals';

const PORT = env.NODE_PORT;

(function main() {
	// Express server and middlewares
	const server: express.Application = new Server().app;

	server.listen(PORT, () => {
		console.log(`Listening on port: ${PORT}`);
	});

	// On server close
	// appServer.close(() => {
	// 	console.log('Node server closed!');
	// });
})();
