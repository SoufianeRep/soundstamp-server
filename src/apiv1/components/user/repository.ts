import { PrismaClient, PrismaPromise, User } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'info', 'error'] });

export class UserRepository {
	/**
	 * Read user by email from db
	 *
	 * @param email Email to search for
	 * @returns User
	 */
	async findByEmail(email: string) {
		try {
			return await prisma.user.findUnique({
				where: {
					email,
				},
			});
		} catch (error: unknown) {
			throw error;
		}
	}

	/**
	 *
	 * @param id
	 * @returns
	 */
	async findByID(id: number) {
		try {
			const user: User | null = await prisma.user.findUnique({
				where: {
					id: id,
				},
			});

			return this.exclude(user, ['password']);
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
			return prisma.user.findMany({
				where: {
					role: {
						not: 'superadmin',
					},
				},
			});
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

	/**
	 * Typesafe exclude function returns a user from DB without provided keys
	 *
	 * @param user
	 * @param keys[]
	 * @returns
	 */
	private exclude<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key> {
		for (const key of keys) {
			delete user[key];
		}
		return user;
	}
}
