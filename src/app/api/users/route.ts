import { NextResponse } from 'next/server';
import { addUser, fetchUsers, fetchUsersById  } from '../../../../lib/queries/users';

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

export async function POST(req: Request) {
  try {
    const { prenom, nom, email, password, id_etablissement, id_service, id_role } = await req.json();

    if (!prenom || !nom || !email || !password || !id_etablissement || !id_service || !id_role) {
      return NextResponse.json({ error: "Tout les champs sont requis." }, { status: 400 });
    }

    await addUser(prenom, nom, email, password, id_etablissement, id_service, id_role );

    return NextResponse.json({ message: "Utilisateur ajouté" }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Erreur de base de données" }, { status: 500 });
  }
}

