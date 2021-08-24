import { Command, CommandOptions, PieceContext, Args as SapphireArgs, CommandContext } from "@sapphire/framework";
import { PermissionResolvable } from "discord.js";

/**
 * To be done
 * this can be used as a custom command class
 */
export abstract class ObligatorCommand extends Command {
	constructor(context: PieceContext) {
		super(context, {
			preconditions: []
		});
	}
}

export namespace ObligatorCommand {
	export type RunInOption = 'text' | 'news' | 'dm';
	export type Options = CommandOptions & {
		permissionLevel?: number;
		permissions?: PermissionResolvable;
		runIn?: RunInOption[];
	}
	export type Args = SapphireArgs;
	export type Context = CommandContext;
}