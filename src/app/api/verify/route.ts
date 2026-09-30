import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { key, param } = await request.json();
    const targetKey = (key || '').toUpperCase().trim();
    const cleanParam = (param || '').trim();

    const VALID_KEYS = ['SALSETTE', 'SOLVER', 'NEXUS', 'TOWER'];
    if (!VALID_KEYS.includes(targetKey)) {
      return NextResponse.json(
        { success: false, logs: [`[ERROR] INVALID KEY SYSTEM TARGET: ${targetKey}`] },
        { status: 400 }
      );
    }

    const logs: string[] = [
      `[*] INITIATING TASK: BACKEND COMPILE CHECK`,
      `[*] ESTABLISHING COMPILER SCOPE TARGETING: ${targetKey}`,
      '[*] PARSING SOURCE FILES IN SUBFOLDERS...',
      '[*] EVALUATING ARCHITECTURAL BOUNDARY MOATS...',
      '[*] CHECKING THREAD-SAFETY LOCKING SCHEMES...',
      '[*] EVALUATING ENVELOPE PROTOCOLS & SCHEMAS...'
    ];

    // Enforce Active Validation
    if (targetKey === 'SOLVER') {
      const val = parseFloat(cleanParam);
      if (isNaN(val) || val < 0.01 || val > 0.1) {
        logs.push(
          `[ERROR] SOLVER MECHANICAL INSTABILITY ENCOUNTERED. PARAM '${cleanParam}' OUT OF RANGE.`,
          `[ERROR] LIMIT ENVELOPE VIOLATION: VALUE MUST BE BETWEEN 0.01 AND 0.1.`
        );
        return NextResponse.json({ success: false, logs });
      }
      logs.push(
        `[OK] CUDA_INIT_SOLVER: parallel computation mesh solved with 0 overlapping frames.`,
        `[SUCCESS] DECRYPTION KEY FOUND: [ ${targetKey} ]`
      );
    } else if (targetKey === 'TOWER') {
      if (cleanParam !== 'sys_init --override') {
        logs.push(
          `[ERROR] BYPASS_SECURE_OVERRIDE: INVALID KEY COMPILER COMMAND '${cleanParam}'.`,
          `[ERROR] BYPASS REJECTED. COMPILER OVERRIDE COMMAND NOT RECOGNIZED.`
        );
        return NextResponse.json({ success: false, logs });
      }
      logs.push(
        `[OK] BYPASS_SECURE_OVERRIDE: tactical override verified. Sovereign node unlocked.`,
        `[SUCCESS] DECRYPTION KEY FOUND: [ ${targetKey} ]`
      );
    } else if (targetKey === 'SALSETTE') {
      logs.push(
        `[OK] HYD_GRID_VALID: CONSISTENCY INTEGRITY CONFIRMED AT 216,284 CELLS.`,
        `[SUCCESS] DECRYPTION KEY FOUND: [ ${targetKey} ]`
      );
    } else if (targetKey === 'NEXUS') {
      logs.push(
        `[OK] ARBITRATION_VERIFY: execution DAG resolved. Deadlocks cleared.`,
        `[SUCCESS] DECRYPTION KEY FOUND: [ ${targetKey} ]`
      );
    }

    // Update persistent status
    const db = await readDb();
    if (!db.unlockedKeys.includes(targetKey)) {
      db.unlockedKeys.push(targetKey);
      await writeDb(db);
    }

    return NextResponse.json({ success: true, logs });
  } catch (error) {
    console.error('[API verify] Error:', error);
    return NextResponse.json(
      { success: false, logs: ['[ERROR] SYSTEM FAULT COMPILATION EXCEPTION. PLEASE RETRY.'] },
      { status: 500 }
    );
  }
}
