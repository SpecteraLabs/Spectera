import { Argument, ArgumentContext } from '@sapphire/framework';
import { Duration } from '@sapphire/time-utilities';

export class UserArgument extends Argument<Date> {
	public async run(parameter: string, context: ArgumentContext) {
		const date = new Duration(parameter).fromNow;
		if (!isNaN(date.getTime()) && date.getTime() > Date.now()) return this.ok(date);
		return this.error({ parameter, identifier: 'This is not a valid duration!', context });
	}
}
