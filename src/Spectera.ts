import '#lib/setup';
import { SpecteraClient } from '#structures/SpecteraClient';
import { PrismaClient } from '@prisma/client';
import { container } from '@sapphire/framework';

const client = new SpecteraClient();
container.database = new PrismaClient();

client.start();
