import bcrypt from 'bcrypt';
import { PrismaClient, PrismaPromise, User } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query', 'error', 'error', 'warn'] });

export class UserRepository {
	/**
	 * Read user by email from db
	 *
	 * @param email Email to search for
	 * @returns User
	 */
	readByEmail(email: string): PrismaPromise<User | null> | Error {
		try {
			return prisma.user.findUnique({
				where: {
					email: email,
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
	readAllUsers(): PrismaPromise<User[] | []> | Error {
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
	createUser(user: User): PrismaPromise<User> | Error {
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
