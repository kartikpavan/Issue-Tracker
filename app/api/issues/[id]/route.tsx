import { issueSchema, patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import delay from "delay";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

//PUT -> Replacing an Entire Object
//PATCH -> Updating one or more properties
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  const body = await request.json();
  console.log(body);

  //Validation the body
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

  if (body.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    });
    if (!user)
      return NextResponse.json({ error: "Invalid User" }, { status: 400 });
  }

  // Find the issue
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue Not found" }, { status: 404 });

  //Update the issue
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      assignedToUserId: body.assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });
  await delay(1000); //! Delete me later
  // Find the issue
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });
  if (!issue)
    return NextResponse.json({ error: "Issue Not found" }, { status: 404 });
  // Delete the issue
  await prisma.issue.delete({ where: { id: issue.id } });

  return NextResponse.json({ success: true });
}
