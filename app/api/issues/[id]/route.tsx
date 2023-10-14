import { issueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

//PUT -> Replacing an Entire Object
//PATCH -> Updating one or more properties
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  console.log(body);

  //Validation the body
  const validation = issueSchema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.format(), { status: 400 });

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
    },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
}
