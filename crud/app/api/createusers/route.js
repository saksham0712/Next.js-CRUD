import { createUser } from "@/utils/createuser";
import { NextResponse } from "next/server";
// import { createUser } from "../../output"; // Adjust the import path as needed


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
