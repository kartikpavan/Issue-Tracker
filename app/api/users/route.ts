import prisma from "@/prisma/client";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
  const users = await prisma.user.findMany({ orderBy: { name: "asc" } });
  if (!users) {
    return NextResponse.json({ error: "No users found" }, { status: 404 });
  }
  return NextResponse.json(users);
}
