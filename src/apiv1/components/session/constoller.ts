import { NextFunction, Request, Response } from 'express';
import { bind } from 'decko';
import { SessionRepository } from './repository';
import { Session } from '@prisma/client';

export class SessionController {
	readonly repo: SessionRepository = new SessionRepository();

	@bind
	async createSession(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const details: Session = req.body;
			console.log(details);

			const conflict = await this.repo.foundConflicting(details);

			if (conflict) return res.status(400).json({ success: false, data: { error: 'busy slot' } });
			const session = await this.repo.create(details);
			return res.json({ success: true, data: { session } });
		} catch (error) {
			return next(error);
		}
	}

	@bind
	async getAllSessions(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const sessions = await this.repo.findAll();
			return res.json({ success: true, data: { sessions } });
		} catch (error) {
			return next(error);
		}
	}

	@bind
	async getSessionsByStudio(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const studioId = +req.params.id;
			const sessions = await this.repo.findByStudio(studioId);
			return res.json({ success: true, data: { sessions } });
		} catch (error) {
			return next(error);
		}
	}

	@bind
	async deleteSession(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const sessionId = +req.params.id;
			const session = await this.repo.delete(sessionId);
			return res.status(202).json({ success: true, data: { message: 'Session deleted', session } });
		} catch (error) {
			return next(error);
		}
	}

	@bind
	async updateSession(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const sessionId = +req.params.id;
			const sessionDetails: Session = req.body;
			console.log(sessionDetails);
			const session = await this.repo.update(sessionId, sessionDetails);
			return res.status(202).json({ success: true, data: { session } });
		} catch (error) {
			return next(error);
		}
	}
}
