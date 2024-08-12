import prisma from "../prismaClient";
import { NextResponse } from "next/server";

const updateuser = async (id, name, email) => {
try {
    const results = await prisma.users.update({
        where: {
            id: parseInt(id),
        },
        data: {
            name :name,
            email:email,
        },
    })
    console.log(results)
    return results;
} catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
}    
}

export async function POST(request) {
    try {
        const { id, name, email } = await request.json();
        const user = await updateuser(id, name, email);
        return NextResponse.json(user);
    } catch (error) {
        console.error("error updating user", error);
        return NextResponse.json({ error: "Error updating user" }, { status: 500 });
    }
}