import { NextResponse } from 'next/server';
import { addRole, fetchRoles } from '../../../../lib/queries/roles';

export async function GET() {
    try {
        const roles = await fetchRoles();
        return NextResponse.json({ roles });
    } catch (error) {
        console.error('Error fetching roles:', error);
        return NextResponse.json({ error: 'Failed to fetch roles' }, { status: 500 });
    }
}

export async function POST(req: Request) {
  try {
    const { role } = await req.json();

    if (!role) {
      return NextResponse.json({ error: "Le nom de role est requis." }, { status: 400 });
    }

    await addRole(role);

    return NextResponse.json({ message: "Service ajouté" }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Erreur de base de données" }, { status: 500 });
  }
}