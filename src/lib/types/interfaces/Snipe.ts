import type { GuildMember, MessageAttachment } from "discord.js";

export interface SnipedMessageObject {
	content: string;
	author: string;
	member: GuildMember;
	image: MessageAttachment | null | string | undefined
}