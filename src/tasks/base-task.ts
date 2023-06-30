import { PrismaClient } from '@prisma/client';
import { Client as DiscordClient, Guild } from 'discord.js';
import { TaskDatas } from './types';

export default abstract class BaseTaskExecutor {
	protected discordClient: DiscordClient;
	protected prismaClient: PrismaClient;

	constructor(discordClient: DiscordClient, prismaClient: PrismaClient) {
		this.discordClient = discordClient;
		this.prismaClient = prismaClient;
	}

    abstract executeTask(params: TaskDatas): Promise<never | void>;
}