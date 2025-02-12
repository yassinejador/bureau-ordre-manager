import { NextResponse } from 'next/server';
import { archiveUser } from '../../../../lib/handlers/archiveUser';
import { getAuthenticatedUser } from '../../../../lib/auth';
import { addLog } from '../../../../lib/queries/logs';

export async function POST(req: Request) {
  try {

    const authenticatedUser = await getAuthenticatedUser();
    if (!authenticatedUser) {
      throw new Error("Utilisateur non authentifié");
    }

    console.log("🔍 ID utilisateur connecté :", authenticatedUser.id);
    
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }

    await archiveUser(id);
    await addLog ( authenticatedUser.id, `Supprission d'utilisateur avec id  ${id}`);


    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error archiving user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
