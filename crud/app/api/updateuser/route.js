import { updateuser } from "@/utils/updateUser";
import { NextResponse } from "next/server";

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