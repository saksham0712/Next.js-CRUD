import { deleteuser } from "@/utils/deleteuser";

import { NextResponse } from "next/server";

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