import './setup';
import { SpecteraClient } from '#structures/SpecteraClient';
import { PrismaClient } from '@prisma/client';
import { container } from '@sapphire/framework';

const client = new SpecteraClient();
const prisma = new PrismaClient();

container.database = prisma;
client.start();
