import client from "@/lib/mongo/mongo-config";
import { NextRequest, NextResponse } from "next/server";

const SAVE = async (request: NextRequest) => {
    try {
        const body = await request.json();
        const db = client.db("yourDatabaseName");
        const collection = db.collection("yourCollectionName");

        const result = await collection.insertOne(body);

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        return NextResponse.json({ success: false, error: error }, { status: 500 });
    }
};

export default SAVE;