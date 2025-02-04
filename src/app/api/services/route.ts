import { NextResponse } from 'next/server';
import { addService, fetchServices } from '../../../../lib/queries/services';

export async function GET() {
  try {
    const services = await fetchServices();
    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { nomService } = await req.json();

    if (!nomService) {
      return NextResponse.json({ error: "Le nom est requis." }, { status: 400 });
    }

    await addService(nomService);

    return NextResponse.json({ message: "Service ajouté" }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Erreur de base de données" }, { status: 500 });
  }
}