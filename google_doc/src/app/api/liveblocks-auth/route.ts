import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { sessionClaims } = await auth();
    const user = await currentUser();

    if (!sessionClaims || !user) return new NextResponse('Unauthorized!', { status: 401 });

    const { room } = await req.json();
    
}