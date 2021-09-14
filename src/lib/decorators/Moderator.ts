import { createFunctionPrecondition, FunctionFallback } from "@sapphire/decorators";
import { container } from '@sapphire/framework';
import type { Message } from "discord.js";

export function Moderator(fallback: FunctionFallback = (): void => undefined): MethodDecorator {
	return createFunctionPrecondition(async (message: Message) => {
		const result = await container.database.guildSettings.findUnique({
			where: { id: message.guild!.id }
		})
		return message.member!.roles.cache.some(role => result!.modRoles.includes(role.id))
	}, fallback)
}