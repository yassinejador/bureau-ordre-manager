import { NextResponse } from 'next/server';
import { archiveUser } from '../../../../lib/handlers/archiveUser';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }

    await archiveUser(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error archiving user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
