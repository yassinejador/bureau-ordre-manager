import { NextResponse } from 'next/server';
import { addPermission, fetchPermissions, fetchPermissionsByRole, modifierPermissionDetails } from '../../../../../lib/queries/permissions';

type Params = {
  params: { role_id: string };
};

export async function GET(request: Request, { params }: Params) {
  try {
    const roleId = parseInt(params.role_id, 10);
    if (isNaN(roleId)) {
      return NextResponse.json({ error: "Invalid role ID" }, { status: 400 });
    }

    const permissions = await fetchPermissionsByRole(roleId);

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

export async function PUT(req: Request) {
  try {
    const { idPermissionDetails, hasPermission } = await req.json();

    if (!idPermissionDetails) {
      return NextResponse.json({ error: "L'ID de permission est requis." }, { status: 400 });
    }


    await modifierPermissionDetails(idPermissionDetails, hasPermission);

    return NextResponse.json({ message: "permission ajouté" }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Erreur de base de données" }, { status: 500 });
  }
}