import { bind } from 'decko';
import { Strategy, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import { UserRepository } from '../../../apiv1/components/user/repository';

export class JwtStrategy {
	#userRepo: UserRepository = new UserRepository();
	#strategyOptions: StrategyOptions;
	strategy: Strategy;

	constructor(strategyOptions: StrategyOptions) {
		this.#strategyOptions = strategyOptions;
		this.strategy = new Strategy(this.#strategyOptions, this.verify);
	}

	@bind
	async verify(payload: any, done: VerifiedCallback): Promise<void> {
		try {
			const user = await this.#userRepo.findByID(payload.userID);

			if (!user) return done(null, null);

			// do something after verification
			// Set permissions

			return done(null, user);
		} catch (error) {
			return done(error);
		}
	}
}
