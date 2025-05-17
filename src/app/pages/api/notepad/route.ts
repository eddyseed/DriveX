import client from "@/lib/mongo/mongo-config";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        await client.connect();
        

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: "An error occurred" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}