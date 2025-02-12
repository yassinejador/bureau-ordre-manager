import { NextResponse } from 'next/server';
import { fetchCourriers } from '../../../../lib/queries/arrivées';


export async function GET() {
    try {
        const courriers = await fetchCourriers();
        return NextResponse.json({ courriers });
    } catch (error) {
        console.error('Error fetching courriers:', error);
        return NextResponse.json({ error: 'Failed to fetch courriers' }, { status: 500 });
    }
}
