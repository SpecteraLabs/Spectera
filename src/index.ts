import { Config } from './interfaces/Config';
import * as ConfigJSON from '../config.json';
import { Obligator } from './client/Client';

new Obligator().start(ConfigJSON as Config);
