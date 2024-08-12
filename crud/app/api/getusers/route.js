
import prisma from "../prismaClient";

import { NextResponse } from "next/server";

const queryData = async () => {
    try {
      const queryOutput = await prisma.users.findMany();
      return queryOutput;
  
  } catch (error) {
      console.log(error)
  }
};

export async function GET() { 
    try {
        const queryOutput = await queryData();
        return NextResponse.json(queryOutput);
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error fetching data" }, { status: 500 });
    }
}
