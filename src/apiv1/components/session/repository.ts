import { PrismaClient, Session } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'info', 'error'] });

export class SessionRepository {
	/**
	 * return true if a session is has a start or end time within the range of
	 * another session in the same studio.
	 * @param session
	 * @returns
	 */
	async foundConflicting(session: Session): Promise<Session | void> {
		try {
			const { studio_id, startDate, endDate } = session;
			const conflict = await prisma.session.findFirst({
				where: {
					studio_id,
					OR: [
						{
							startDate: {
								lt: endDate,
								gte: startDate,
							},
						},
						{
							endDate: {
								lte: endDate,
								gt: startDate,
							},
						},
					],
				},
			});
			return conflict;
		} catch (error) {
			throw error;
		}
	}
	/**
	 * Create a new session
	 * @param session
	 * @returns
	 */
	async create(session: Session): Promise<Session | void> {
		try {
			const { title, notes, startDate, endDate, studio_id } = session;
			return await prisma.session.create({
				data: {
					title,
					notes,
					startDate,
					endDate,
					studio_id,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Delete a session with the provided id
	 * @param id
	 * @returns
	 */
	async delete(id: number) {
		try {
			return await prisma.session.delete({
				where: {
					id,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Get all the session in the db
	 * @returns Promise or throws an error
	 */
	async findAll(): Promise<Session[] | void> {
		try {
			return await prisma.session.findMany();
		} catch (error) {
			throw error;
		}
	}

	/**
	 * Get all the session with the provided studio id
	 * @param id studio id
	 * @returns
	 */
	async findByStudio(id: number): Promise<Session[] | void> {
		try {
			return prisma.session.findMany({
				where: {
					studio_id: id,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	async update(id: number, session: Session): Promise<Session | void> {
		try {
			const { title, startDate, endDate, notes } = session;
			return prisma.session.update({
				where: {
					id: id,
				},
				data: {
					title,
					startDate,
					endDate,
					notes,
				},
			});
		} catch (error) {
			throw error;
		}
	}
}
