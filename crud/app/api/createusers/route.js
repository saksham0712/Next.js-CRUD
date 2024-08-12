import prisma from "../prismaClient";

import { NextResponse } from "next/server";



const createUser = async (name, email) => {
    try {
        const results = await prisma.users.create({
            data: { 
                name,
                email,
            },
        })
        return results;
    } catch (error) {
        console.log(error);
        throw new Error('Error in creating user')
    }
}

export async function POST(request) {
  try {
    const { name, email } = await request.json(); // Extract data from request body
    const user = await createUser(name, email);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
