import { ApplyOptions } from '@sapphire/decorators';
import { ListenerOptions, Listener, Store } from '@sapphire/framework';
import { blue, gray, green, magenta, yellow, yellowBright } from 'colorette';
import { Collection } from 'discord.js';
import { version } from '../../package.json';

const dev = process.env.NODE_ENV !== 'production';

@ApplyOptions<ListenerOptions>({
	once: true
})
export class Ready extends Listener {
	private readonly style = dev ? yellow : blue;

	public run() {
		this.printBanner();
		this.printStoreDebugInformation();
		this.container.client.snipes = new Collection();
	}

	private printBanner() {
		const success = green('+');

		const llc = yellowBright;
		const blc = dev ? magenta : blue;

		const line01 = llc(String.raw`		          /////         `);
		const line02 = llc(String.raw`	           /////////      `);
		const line03 = llc(String.raw`             ////////////         `);
		const line04 = llc(String.raw`	  //////////              `);
		const line05 = llc(String.raw`           //////    ///          `);
		const line06 = llc(String.raw`          ///    //////           `);
		const line07 = llc(String.raw`	    /////////             `);
		const line08 = llc(String.raw`        ///////////               `);
		const line09 = llc(String.raw`	//////////                  `);
		const line10 = llc(String.raw`	 /////                      `);
		const line11 = llc('');

		// Offset Pad
		const pad = ' '.repeat(7);

		console.log(
			String.raw`
${line01} 
${line02}   ________  _______    _______   ______  ___________  _______   _______        __      
${line03}  /"       )|   __ "\  /"     "| /" _  "\("     _   ")/"     "| /"      \      /""\     
${line04} (:   \___/ (. |__) :)(: ______)(: ( \___))__/  \\__/(: ______)|:        |    /    \    
${line05}  \___  \   |:  ____/  \/    |   \/ \        \\_ /    \/    |  |_____/   )   /' /\  \   
${line06}   __/  \\  (|  /      // ___)_  //  \ _     |.  |    // ___)_  //      /   //  __'  \  
${line07}  /" \   :)/|__/ \    (:      "|(:   _) \    \:  |   (:      "||:  __   \  /   /  \\  \ 
${line08} (_______/(_______)    \_______) \_______)    \__|    \_______)|__|  \___)(___/    \___)																			 
${line09}${pad}${blc(version)}
${line10} ${pad}[${success}] Gateway
${line11} ${pad} ${pad} ${pad} ${pad}   ${dev ? ` ${pad}${blc('<')}${llc('/')}${blc('>')} ${blc('DEVELOPMENT MODE')}` : ''}
		`.trim()
		);
	}

	private printStoreDebugInformation() {
		const { client, logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop()!;

		for (const store of stores) logger.info(this.styleStore(store, false));
		logger.info(this.styleStore(last, true));
	}

	private styleStore(store: Store<any>, last: boolean) {
		return gray(`${last ? '└─' : '├─'} Loaded ${this.style(store.size.toString().padEnd(3, ' '))} ${store.name}.`);
	}
}
