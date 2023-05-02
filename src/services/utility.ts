import { compare, genSalt, hash } from 'bcrypt';
import { v1 as uuidv1 } from 'uuid';
const saltRounds = 10;

export class UtilityService {
	/**
	 * Hash plain password
	 *
	 * @param plainPassword Password to hash
	 * @returns hashed password
	 */
	static hashPassword(plainPassword: string): Promise<string> {
		return new Promise((resolve, reject) => {
			genSalt(saltRounds, (error, salt) => {
				if (error) reject(error);

				hash(plainPassword, salt, (error, hashedVal) => {
					if (error) reject(error);
					resolve(hashedVal);
				});
			});
		});
	}
	/**
	 * Compares plain password with hashed password
	 *
	 * @param plainPassword Plain password to compare
	 * @param hashedPassword Hashed password to compare
	 * @returns whether passwords match
	 */
	static verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			compare(plainPassword, hashedPassword, (err, res) => {
				if (err) reject(err);
				resolve(res);
			});
		});
	}

	/**
	 * Generate UUID
	 *
	 * @returns UUID
	 */
	static generateUUID(): string {
		return uuidv1();
	}
}
