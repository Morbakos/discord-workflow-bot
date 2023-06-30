import { PrismaClient } from '@prisma/client';
import { Channel, ChannelType, Client as DiscordClient } from 'discord.js';
import BaseTaskExecutor from './base-task';
import { TaskDatas } from './types';


export default class CreateChannelTask extends BaseTaskExecutor {
	/**
	*
	*/
	constructor(discordClient: DiscordClient, prismaClient: PrismaClient) {
		super(discordClient, prismaClient);
	}

	async executeTask(taskDatas: TaskDatas): Promise<never | void> {
		const guild = await this.discordClient.guilds.fetch(taskDatas.context.guildId);

		const { channelName, channelType } = JSON.parse(taskDatas.taskParameters!.toString());

		guild.channels.create({
			name: channelName,
			type: channelType,
		});
	}
}