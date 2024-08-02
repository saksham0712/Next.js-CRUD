import { queryData } from "@/utils/getQueryOutput";
// import prisma from "@/utils/prismaClient";
import { NextResponse } from "next/server";

export async function GET() { 
    try {
        const queryOutput = await queryData();
        return NextResponse.json(queryOutput);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }
}
