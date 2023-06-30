import { DiscordEvent, Prisma, TaskExecutor, WorkflowTasks } from '@prisma/client';
import { GuildMember } from 'discord.js';

export type TaskContext = {
    guildId: string,
    guildMemberFrom: GuildMember,
    eventType: DiscordEvent
}

export type AvailableTasks = 'CreateChannel'

export type TaskDatas = {
    context: TaskContext
    taskParameters: Prisma.JsonValue
}