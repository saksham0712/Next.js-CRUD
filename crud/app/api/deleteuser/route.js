import prisma from "../prismaClient";
import { NextResponse } from "next/server";

const deleteuser = async (id) => {
    try {
        const results = await prisma.users.delete({
            where: {
                id: parseInt(id),
            }
        })
        return results; 
    } catch (error) {
        console.error(error)
    }
}
export async function DELETE(request){
    try {
        const { id } = await request.json();
        const user = await deleteuser(id);
        return NextResponse.json(user);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
    }
}