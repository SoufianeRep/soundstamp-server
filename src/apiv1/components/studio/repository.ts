import { PrismaClient, Studio } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'info', 'error'] });

export class StudioRepository {
	/**
	 *
	 * @param id
	 * @returns
	 */
	async findById(id: number): Promise<Studio> {
		try {
			return await prisma.studio.findUnique({
				where: {
					id,
				},
			});
		} catch (error: unknown) {
			throw error;
		}
	}

	/**
	 *
	 * @returns
	 */
	async findAll(): Promise<Studio[]> {
		try {
			return await prisma.studio.findMany();
		} catch (error) {
			throw error;
		}
	}

	/**
	 *
	 * @param studio
	 * @returns
	 */
	async createStudio(studio: Studio): Promise<Studio> {
		try {
			const { name, location } = studio;
			return await prisma.studio.create({
				data: {
					name,
					location,
				},
			});
		} catch (error: unknown) {
			throw error;
		}
	}

	/**
	 *
	 * @param id
	 * @param studio
	 * @returns
	 */
	async updateStudio(id: number, studio: Studio) {
		try {
			return await prisma.studio.update({
				where: {
					id,
				},
				data: {
					name: studio.name,
					location: studio.location,
				},
			});
		} catch (error) {
			throw error;
		}
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async deleteStudio(id: number) {
		try {
			return await prisma.studio.delete({
				where: {
					id,
				},
			});
		} catch (error) {
			throw error;
		}
	}
}
