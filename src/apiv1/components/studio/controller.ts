import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { StudioRepository } from './repository';

export class StudioController {
	readonly repo: StudioRepository = new StudioRepository();

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	@bind
	async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const studios = await this.repo.findAll();
			return res.json({ success: true, data: { studios } });
		} catch (error) {
			return next(error);
		}
	}
	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 */
	@bind
	async getStudio(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const studioId = +req.params.id;
			const studio = await this.repo.findById(studioId);
			return res.json({ success: true, data: { studio } });
		} catch (error) {
			return next(error);
		}
	}

	/**
	 *
	 * @param req
	 * @param res
	 * @param next
	 * @returns
	 */
	@bind
	async deleteStudio(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const studioId = +req.params.id;
			const studio = await this.repo.deleteStudio(studioId);
			return res.json({
				success: true,
				data: {
					message: 'Successfully Deleted',
					studio,
				},
			});
		} catch (error) {
			return next(error);
		}
	}
}
