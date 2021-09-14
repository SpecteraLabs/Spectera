import { createFunctionPrecondition, FunctionFallback } from "@sapphire/decorators";
import type { Message } from "discord.js";

export function Administrtor(fallback: FunctionFallback = (): void => undefined): MethodDecorator {
	return createFunctionPrecondition((message: Message) => message.member!.permissions.has('ADMINISTRATOR'), fallback)
}