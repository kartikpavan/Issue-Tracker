import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";

// Components
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

const IssueDetailPage = async ({ params }: { params: { id: string } }) => {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(params.id) },
  });

  // If the id is not found redirect user to 404 page
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} width="auto" gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton issueId={issue.id} />
      </Box>
    </Grid>
  );
};

export const dynamic = "force-dynamic";

export default IssueDetailPage;
