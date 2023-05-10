import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';
import { UserRepository } from '../user/repository';
import { UtilityService } from '../../../services/utility';
import { AuthService } from '../../../services/auth';

export class AuthController {
	readonly userRepo: UserRepository = new UserRepository();
	readonly authService: AuthService = new AuthService();

	@bind
	async signinUser(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
		try {
			const { email, password } = req.body;
			const user = await this.userRepo.findByEmail(email);

			if (!user || !(await UtilityService.verifyPassword(password, user.password))) {
				return res.status(401).json({ status: 401, error: 'Wrong email or password' });
			}

			// Create a JWT token
			const token: string = this.authService.createToken(user.id, user.role);
			// Dont send user password in response
			delete user.password;
			return res.json({ success: true, data: { user, token } });
		} catch (error) {
			return next(error);
		}
	}
}
