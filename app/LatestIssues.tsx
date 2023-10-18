import prisma from "@/prisma/client";
import { Avatar, Box, Card, Flex, Heading, Table } from "@radix-ui/themes";
import Link from "next/link";
import { IssueStatusBadge } from "./components";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5, // fetch only 5 records
    include: {
      assignedToUser: true,
    },
  });

  return (
    <Card>
      <Heading size="4">Latest Issues</Heading>
      <Table.Root>
        <Table.Body>
          {issues?.map((issue) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <Flex justify="between" align="center">
                    <Flex direction="column" gap="2">
                      <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                      <Box>
                        <IssueStatusBadge status={issue.status} />
                      </Box>
                    </Flex>
                    <Avatar fallback="?" src={issue.assignedToUser?.image!} />
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card>
  );
};

export default LatestIssues;
