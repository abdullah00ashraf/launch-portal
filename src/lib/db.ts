import fs from 'fs/promises';
import path from 'path';

export interface Submission {
  id: string;
  userIdentity: string;
  orgName: string;
  classification: string;
  description: string;
  product: string;
  timestamp: string;
}

export interface DbSchema {
  unlockedKeys: string[];
  submissions: Submission[];
}

const dbDir = path.join(process.cwd(), 'data');
const dbFilePath = path.join(dbDir, 'db.json');

// Helper to ensure database file exists
async function ensureDb() {
  try {
    await fs.mkdir(dbDir, { recursive: true });
    try {
      await fs.access(dbFilePath);
    } catch {
      // Create with seed state if not found
      const defaultState: DbSchema = { unlockedKeys: [], submissions: [] };
      await fs.writeFile(dbFilePath, JSON.stringify(defaultState, null, 2), 'utf-8');
    }
  } catch (error) {
    console.error('[DB] Failed to ensure database exists:', error);
  }
}

// Read database
export async function readDb(): Promise<DbSchema> {
  await ensureDb();
  try {
    const raw = await fs.readFile(dbFilePath, 'utf-8');
    return JSON.parse(raw) as DbSchema;
  } catch (error) {
    console.error('[DB] Failed to read database, returning default:', error);
    return { unlockedKeys: [], submissions: [] };
  }
}

// Write database
export async function writeDb(data: DbSchema): Promise<boolean> {
  await ensureDb();
  try {
    await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('[DB] Failed to write database:', error);
    return false;
  }
}
