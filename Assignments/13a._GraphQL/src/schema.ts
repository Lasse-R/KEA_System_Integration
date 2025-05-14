import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Read schema.graphql file
const typeDefs = readFileSync(resolve(__dirname, '../schema.graphql'), {
  encoding: 'utf-8',
});

export default typeDefs;