import { NextResponse } from 'next/server';
import { readDb } from '@/lib/db';

export async function GET() {
  try {
    const db = await readDb();
    return NextResponse.json({ unlockedKeys: db.unlockedKeys });
  } catch (error) {
    console.error('[API status] Error:', error);
    return NextResponse.json({ unlockedKeys: [] }, { status: 500 });
  }
}
