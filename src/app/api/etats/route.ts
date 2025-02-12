import { NextResponse } from 'next/server';
import { fetchEtats } from '../../../../lib/queries/etats';

export async function GET() {
    try {
        const etats = await fetchEtats();
        return NextResponse.json({ etats });
    } catch (error) {
        console.error('Error fetching etats:', error);
        return NextResponse.json({ error: 'Failed to fetch etats' }, { status: 500 });
    }
}