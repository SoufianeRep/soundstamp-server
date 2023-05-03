import { PrismaClient, PrismaPromise, User } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'info', 'error'] });

export class UserRepository {
	/**
	 * Read user by email from db
	 *
	 * @param email Email to search for
	 * @returns User
	 */
	readByEmail(email: string) {
		try {
			return prisma.user.findUnique({
				where: {
					email,
				},
			});
		} catch (error: unknown) {
			throw error;
		}
	}

	/**
	 * Read all users db
	 *
	 * @returns User[]
	 */
	readAllUsers(): PrismaPromise<User[] | []> {
		try {
			return prisma.user.findMany();
		} catch (error: unknown) {
			throw error;
		}
	}

	/**
	 * Read user by email from db
	 *
	 * @param User User object
	 * @returns User
	 */
	createUser(user: User): PrismaPromise<User> {
		try {
			return prisma.user.create({
				data: {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					password: user.password,
					role: user.role,
					avatarUrl: user.avatarUrl,
				},
			});
		} catch (error: unknown) {
			throw error;
		}
	}
}
