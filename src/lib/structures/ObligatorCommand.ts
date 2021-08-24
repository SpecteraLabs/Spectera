/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Command,
	CommandOptions,
	PieceContext,
	Args as SapphireArgs,
	CommandContext,
	PreconditionEntryResolvable,
	PermissionsPrecondition,
} from '@sapphire/framework';
import type { PermissionResolvable } from 'discord.js';
import { PermissionLevels } from '../types/enums/PermissionLevels';

export abstract class ObligatorCommand extends Command {
	public readonly permissionLevel: PermissionLevels;
	constructor(context: PieceContext, options: ObligatorCommand.Options) {
		super(context, ObligatorCommand.resolvePreConditions(context, options));
		this.permissionLevel = options.permissionLevel ?? PermissionLevels.Everyone;
	}
	protected static resolvePreConditions(
		context: PieceContext,
		options: ObligatorCommand.Options
	): ObligatorCommand.Options {
		options.generateDashLessAliases ??= true;

		const preconditions = (options.preconditions ??=
			[]) as PreconditionEntryResolvable[];

		if (options.permissions) {
			preconditions.push(new PermissionsPrecondition(options.permissions));
		}

		const runInPreCondition = this.resolveRunInPreCondition(
			context,
			options.runIn
		);
		if (runInPreCondition !== null) preconditions.push(runInPreCondition);

		const permissionLevelPreCondition = this.resolvePermissionLevelPreCondition(
			options.permissionLevel
		);
		if (permissionLevelPreCondition !== null) {
			preconditions.push(permissionLevelPreCondition);
		}

		return options;
	}

	protected static resolvePermissionLevelPreCondition(
		permissionLevel = 0
	): PreconditionEntryResolvable | null {
		if (permissionLevel === 0) return null;
		if (permissionLevel <= PermissionLevels.Moderator) {
			return ['BotOwner', 'Moderator'];
		}
		if (permissionLevel <= PermissionLevels.Administrator) {
			return ['BotOwner', 'Administrator'];
		}
		if (permissionLevel <= PermissionLevels.BotOwner) return 'BotOwner';
		return null;
	}

	protected static resolveRunInPreCondition(
		context: PieceContext,
		runIn?: ObligatorCommand.RunInOption[]
	): PreconditionEntryResolvable | null {
		runIn = [...new Set(runIn ?? (['text', 'news', 'dm'] as const))];

		if (runIn.length === 3) return null;
		if (runIn.length === 0) {
			throw new Error(
				`ObligatorCommand[${context.name}]: "runIn" was specified as an empty array.`
			);
		}

		const array: any[] = [];
		if (runIn.includes('dm')) array.push('DMOnly');

		const hasText = runIn.includes('text');
		const hasNews = runIn.includes('news');
		if (hasText && hasNews) array.push('GuildOnly');
		else if (hasText) array.push('TextOnly');
		else if (hasNews) array.push('NewsOnly');

		return array;
	}
}

export namespace ObligatorCommand {
	export type RunInOption = 'text' | 'news' | 'dm';
	export type Options = CommandOptions & {
		permissionLevel?: number;
		permissions?: PermissionResolvable;
		runIn?: RunInOption[];
		guarded?: boolean;
		hidden?: boolean;
	};
	export type Args = SapphireArgs;
	export type Context = CommandContext;
}
