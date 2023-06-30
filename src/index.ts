import { PrismaClient } from '@prisma/client';
import { Client as DiscordClient } from 'discord.js';
import Logger from './shared/logger';
import { TaskContext, TaskExecutor } from './tasks';
import BaseTaskExecutor from './tasks/base-task';
import CreateChannelTask from './tasks/create-channel.task';

const prismaClient: PrismaClient = new PrismaClient();
const discordClient: DiscordClient = new DiscordClient({
	intents: ['Guilds', 'MessageContent', 'GuildMembers'],
});

async function main() {
	Logger.addLog('Starting main init');
	addDiscordEventHandler();

	// Tests only
	const className = 'create-channel.task';
	const classImport = (await import(`./tasks/${className}`)).default;
	const executor = new classImport(discordClient, prismaClient);

	console.log(executor instanceof CreateChannelTask);

	Logger.addLog('End main init');
	// console.log(`Starting main function at ${startTime.toUTCString()}`);
	// const allUsers = await prismaClient.workflowContext.findMany({
	// 	include: {
	// 		WorkflowTasks: {
	// 			include: {
	// 				taskExecutor: true,
	// 			},
	// 		},
	// 	},
	// });
	// allUsers.forEach((item) => console.log(item.WorkflowTasks));
}

function addDiscordEventHandler() {
	Logger.addLog('Adding Discord event listener');
	discordClient.once('ready', (readyClient) => {
		Logger.addLog(`Client ${readyClient.user.toString()} is online`);
	});

	discordClient.on('messageCreate', async (message) => {

		// Since DM workflow aren't supported yet, exclude them
		if (message.channel.isDMBased()) {
			return;
		}

		const taskContext: TaskContext = {
			eventType: 'MESSAGE_CREATED',
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			guildId: message.guildId!,
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			guildMemberFrom: message.member!,
		};

		await new TaskExecutor(discordClient, prismaClient).performWorkflowActions(taskContext);
	});

	discordClient.on('debug', (message) => Logger.addLog(message));
	discordClient.on('warn', (message) => Logger.addLog(message));
	discordClient.on('error', (message) => Logger.addLog(message));

}

main()
	.then(async () => {
		await prismaClient.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prismaClient.$disconnect();
		process.exit(1);
	});