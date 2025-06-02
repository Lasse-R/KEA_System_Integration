import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function readNewFile(filename) {
    try {
        const filePath = join(__dirname, filename);

        return await readFile(filePath, "utf-8");
    }
    catch (error) {
        throw new Error("Error reading file");
    }
}