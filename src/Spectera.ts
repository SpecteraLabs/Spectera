/*
   Copyright 2021 Spectera Bot

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

import '#lib/setup';
import { SpecteraClient } from '#structures/SpecteraClient';
import { PrismaClient } from '@prisma/client';
import { container } from '@sapphire/framework';
import { start } from '@sapphire/plugin-hmr';

const client = new SpecteraClient();
container.database = new PrismaClient();

void client.start();
if (process.env.NODE_ENV === 'development') {
	start();
}
