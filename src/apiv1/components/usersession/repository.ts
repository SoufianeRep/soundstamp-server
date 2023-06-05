import { PrismaClient, UserSession } from '@prisma/client';

const prisma = new PrismaClient({ log: ['error', 'info', 'query'] });

export class Usersession {
	async create(userId: number, sessionId: number): Promise<UserSession> {
		try {
			return await prisma.userSession.create({
				data: {
					user_id: userId,
					session_id: sessionId,
				},
			});
		} catch (error) {
			throw error;
		}
	}
}
