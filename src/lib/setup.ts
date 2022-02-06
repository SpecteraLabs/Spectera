process.env.NODE_ENV ??= 'development';

import 'reflect-metadata';
import '@sapphire/plugin-logger/register';
import '@sapphire/plugin-api/register';
import '@sapphire/plugin-editable-commands/register';
import '@sapphire/plugin-hmr/register';
import '@sapphire/plugin-i18next/register';
import * as colorette from 'colorette';
import { inspect } from 'util';

inspect.defaultOptions.depth = 1;

colorette.createColors({ useColor: true });
