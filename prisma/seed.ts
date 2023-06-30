import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

	await prisma.taskExecutor.create({
		data: {
			executor: 'create_channel',
		},
	});

	const alice = await prisma.workflowContext.upsert({
		create: {
			guildId: 'toto',
			idDiscordEvent: 'MEMBER_JOINED',
			WorkflowTasks: {
				create: {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					idTaskExecutor: (await prisma.taskExecutor.findFirst())!.idTaskExecutor,
					order: 1,
				},
			},
		},
		where: { idWorkflowContext: 1 },
		update: {},
	});

	const bob = await prisma.workflowContext.upsert({
		create: {
			guildId: 'tata',
			idDiscordEvent: 'MESSAGE_CREATED',
			WorkflowTasks: {
				create: {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					idTaskExecutor: (await prisma.taskExecutor.findFirst())!.idTaskExecutor,
					order: 1,
				},
			},
		},
		where: { idWorkflowContext: 2 },
		update: {},
	});

	console.log({ alice, bob });

}

main()

	.then(async () => {

		await prisma.$disconnect();

	})

	.catch(async (e) => {

		console.error(e);

		await prisma.$disconnect();

		process.exit(1);

	});