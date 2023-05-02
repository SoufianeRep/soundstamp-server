import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
	log: ['query', 'info', 'warn', 'error'],
});

const main = async () => {
	const soufiane = await prisma.user.upsert({
		where: { email: 'ezzine.soufiane@gmail.com' },
		update: {},
		create: {
			firstName: 'soufiane',
			lastName: 'ezzine',
			email: 'ezzine.soufiane@gmail.com',
			password: 'secret',
			avatarUrl: 'https://avatars.githubusercontent.com/u/59670612?v=4',
			role: 'superadmin',
		},
	});

	const youness = await prisma.user.upsert({
		where: { email: 'you.ezzine@gmail.com' },
		update: {},
		create: {
			firstName: 'youness',
			lastName: 'ezzine',
			email: 'you.ezzine@gmail.com',
			password: 'secret',
			role: 'admin',
		},
	});

	const haruna = await prisma.user.upsert({
		where: { email: 'toba.haruna@gmail.com' },
		update: {},
		create: {
			firstName: 'haruna',
			lastName: 'toba',
			email: 'toba.haruna@gmail.com',
			password: 'secret',
			role: 'superadmin',
		},
	});

	console.log(soufiane, youness, haruna);
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (err) => {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	});
