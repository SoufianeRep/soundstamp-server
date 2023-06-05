import { PrismaClient } from '@prisma/client';
import { UtilityService } from '../src/services/utility';

const prisma = new PrismaClient({
	log: ['query', 'info', 'warn', 'error'],
});

const main = async () => {
	const hashPassword = UtilityService.hashPassword;

	// ========================================
	// =============== USERS ==================
	// ========================================

	const soufiane = await prisma.user.upsert({
		where: { email: 'ezzine.soufiane@gmail.com' },
		update: {},
		create: {
			firstName: 'soufiane',
			lastName: 'ezzine',
			email: 'ezzine.soufiane@gmail.com',
			password: await hashPassword('secret'),
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
			password: await hashPassword('secret'),
			avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/60.jpg',
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
			password: await hashPassword('secret'),
			avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/female/4.jpg',
			role: 'user',
		},
	});
	const damir = await prisma.user.upsert({
		where: { email: 'damir@gmail.com' },
		update: {},
		create: {
			firstName: 'damir',
			lastName: 'dzafic',
			email: 'damir@gmail.com',
			password: await hashPassword('secret'),
			avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/63.jpg',
			role: 'admin',
		},
	});
	const yassir = await prisma.user.upsert({
		where: { email: 'yassir@gmail.com' },
		update: {},
		create: {
			firstName: 'yassir',
			lastName: 'ezzine',
			email: 'yassir@gmail.com',
			password: await hashPassword('secret'),
			avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/74.jpg',
			role: 'user',
		},
	});

	console.log(soufiane, youness, haruna, yassir, damir);

	// ========================================
	// =============== Studios ================
	// ========================================

	// delete all studios
	await prisma.studio.deleteMany({});

	const studio1 = await prisma.studio.create({
		data: {
			name: 'Studio 1',
			location: 'casablanca',
		},
	});

	const studio2 = await prisma.studio.create({
		data: {
			name: 'Studio 2',
			location: 'casablanca',
		},
	});

	console.log(studio1, studio2);

	// ========================================
	// =============== SESSIONs ===============
	// ========================================

	await prisma.session.deleteMany();

	const session1 = await prisma.session.create({
		data: {
			title: 'recording 1',
			notes: 'recording for medays',
			startDate: new Date('2023-05-30 09:00:00'),
			endDate: new Date('2023-05-30 11:00:00'),
			studio_id: studio1.id,
		},
	});

	const session2 = await prisma.session.create({
		data: {
			title: 'Mixing 2',
			notes: 'Mixing for medays',
			startDate: new Date('2023-05-30 12:00:00'),
			endDate: new Date('2023-05-30 15:00:00'),
			studio_id: studio1.id,
		},
	});

	console.log(session1, session2);
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
