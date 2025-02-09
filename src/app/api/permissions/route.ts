import { NextResponse } from 'next/server';
import { addPermission, fetchPermissions } from '../../../../lib/queries/permissions';

export async function GET() {
  try {
    const permissions = await fetchPermissions();

    return NextResponse.json({ permissions });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return NextResponse.json({ error: "Failed to fetch permissions" }, { status: 500 });
  }
}

export async function POST(req: Request) {
    try {
      const { permission } = await req.json();
  
      if (!permission) {
        return NextResponse.json({ error: "Le nom de permission est requis." }, { status: 400 });
      }
  
      await addPermission(permission);
  
      return NextResponse.json({ message: "permission ajouté" }, { status: 201 });
    } catch (error) {
      console.error("Database error:", error);
      return NextResponse.json({ error: "Erreur de base de données" }, { status: 500 });
    }
  }