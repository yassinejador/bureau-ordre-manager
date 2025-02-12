import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: NextRequest) {
    const file = req.nextUrl.searchParams.get("file");

    if (!file) {
        return NextResponse.json({ error: "Nom du fichier invalide." }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'uploads', file);

    if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: "Fichier introuvable." }, { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const fileStream = fs.createReadStream(filePath);

    const readableStream = new ReadableStream({
        start(controller) {
            fileStream.on('data', (chunk) => controller.enqueue(chunk));
            fileStream.on('end', () => controller.close());
            fileStream.on('error', (err) => controller.error(err));
        }
    });

    return new NextResponse(readableStream, {
        headers: {
            'Content-Disposition': `attachment; filename="${file}"`,
            'Content-Type': 'application/octet-stream',
            'Content-Length': stat.size.toString(),
        }
    });
}
