import { rm } from 'node:fs/promises';
import { URL } from 'url';

const rootFolder = new URL('../', import.meta.url);
const distFolder = new URL('dist/', rootFolder);

await rm(distFolder, { recursive: true, force: true });
