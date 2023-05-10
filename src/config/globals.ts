import { config } from 'dotenv';
config();

export const env = {
	NODE_PORT: process.env.NODE_PORT || process.env.PORT || 5000,
	DATABASE_URL: process.env.DATABASE_URL,
	SECRET: process.env.SECRET,
	ROLES: {
		SuperAdmin: 'superadmin',
		Admin: 'admin',
		User: 'user',
		Guest: 'guest',
	},
};
