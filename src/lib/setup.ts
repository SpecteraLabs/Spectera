process.env.NODE_ENV ??= 'development';

import 'reflect-metadata';
import '@sapphire/plugin-logger/register';
import '@sapphire/plugin-api/register';
import '@sapphire/plugin-editable-commands/register';
import { options as coloretteOptions } from 'colorette';
import { inspect } from 'util';

inspect.defaultOptions.depth = 1;

coloretteOptions.enabled = true;
