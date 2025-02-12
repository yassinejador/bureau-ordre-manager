import { NextResponse } from 'next/server';
import {  fetchUsers, fetchUsersById  } from '../../../../lib/queries/users';
import { addLog } from "../../../../lib/queries/logs";
import { verifyToken } from "../../../../lib/auth";



export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id'); // Récupérer l'ID de l'utilisateur si disponible

    if (id && !isNaN(Number(id))) {
      const userId = parseInt(id, 10);
      // Si un ID est passé en paramètre, on récupère l'utilisateur spécifique
      const user = await fetchUsersById(userId);

      if (!user) {
        return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
      }

      return NextResponse.json(user); // Retourner un seul utilisateur
    }
    const users = await fetchUsers();
    return NextResponse.json({ users });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

