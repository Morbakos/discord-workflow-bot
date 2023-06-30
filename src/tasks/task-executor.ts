import { PrismaClient } from '@prisma/client';
import { Client as DiscordClient } from 'discord.js';
import { TaskContext, TaskDatas } from './types';

export class TaskExecutor {
	private discordClient: DiscordClient;
	private prismaClient: PrismaClient;

	constructor(discordClient: DiscordClient, prismaClient: PrismaClient) {
		this.discordClient = discordClient;
		this.prismaClient = prismaClient;
	}

	async performWorkflowActions(taskContext: TaskContext) {
		const fullContext = await this.prismaClient.workflowContext.findMany({
			where: {
				guildId: taskContext.guildId,
				idDiscordEvent: taskContext.eventType,
			},
			include: {
				WorkflowTasks: {
					include: {
						taskExecutor: true,
					},
				},
			},
		});

		for (const workflow of fullContext.values()) {
			for await (const task of workflow.WorkflowTasks) {
				const formattedTaskExecutor = `${task.taskExecutor.executor.replace('_', '-')}.task`;
				const importedTaskClass = (await import('./create-channel.task')).default;
				const taskRunner = new importedTaskClass(this.discordClient, this.prismaClient);

				const taskParameters: TaskDatas = {
					context: taskContext,
					taskParameters: task.taskParameter,
				};

				await taskRunner.executeTask(taskParameters);
			}
		}
	}
}