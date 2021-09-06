import {
	Command,
	CommandOptions,
	PieceContext,
	Args as SapphireArgs,
	CommandContext,
	PreconditionEntryResolvable,
	UserPermissionsPrecondition,
} from '@sapphire/framework';
import type { PermissionResolvable } from 'discord.js';
import { PermissionLevels } from '../types/enums/PermissionLevels';

export abstract class SpecteraCommand extends Command {
	public readonly permissionLevel: PermissionLevels;
	public readonly guarded: boolean;
	public readonly hidden: boolean;
	public constructor(context: PieceContext, options: SpecteraCommand.Options) {
		super(context, SpecteraCommand.resolvePreConditions(context, options));
		this.permissionLevel = options.permissionLevel ?? PermissionLevels.Everyone;
		this.guarded = options.guarded ?? false;
		this.hidden = options.hidden ?? false;
	}

	protected static resolvePreConditions(
		context: PieceContext,
		options: SpecteraCommand.Options
	): SpecteraCommand.Options {
		options.generateDashLessAliases ??= true;

		const preconditions = (options.preconditions ??=
			[]) as PreconditionEntryResolvable[];

		if (options.permissions) {
			preconditions.push(new UserPermissionsPrecondition(options.permissions));
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
		if (options.bucket && options.cooldown) {
			preconditions.push({
				name: 'Cooldown',
				context: { limit: options.bucket, delay: options.cooldown },
			});
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
		runIn?: SpecteraCommand.RunInOption[]
	): PreconditionEntryResolvable | null {
		runIn = [...new Set(runIn ?? (['text', 'news', 'dm'] as const))];

		if (runIn.length === 3) return null;
		if (runIn.length === 0) {
			throw new Error(
				`SpecteraCommand[${context.name}]: "runIn" was specified as an empty array.`
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

export namespace SpecteraCommand {
	export type RunInOption = 'text' | 'news' | 'dm';
	export type Options = CommandOptions & {
		permissionLevel?: number;
		permissions?: PermissionResolvable;
		runIn?: RunInOption[];
		guarded?: boolean;
		hidden?: boolean;
		bucket?: number;
		cooldown?: number;
	};
	export type Args = SapphireArgs;
	export type Context = CommandContext;
}
