import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AsigneeSelect from "./AsigneeSelect";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import { cache } from "react";

const fetchIssueID = cache((issueId: number) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchIssueID(parseInt(params.id));

  // If the id is not found redirect user to 404 page
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} width="auto" gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4" justify="center" height="100%">
            <AsigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const issue = await fetchIssueID(parseInt(params.id));
  return {
    title: issue?.title,
    description: "Details of issue ID : " + issue?.id,
  };
}
export const dynamic = "force-dynamic";

export default IssueDetailPage;
