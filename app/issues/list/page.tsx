import Pagination from "@/app/components/Pagination";
import prisma from "@/prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import IssueTable, { QueryProps } from "./IssueTable";
import IssuesToolbar from "./IssuesToolbar";
import { Metadata } from "next";

const IssuesPage = async ({ searchParams }: { searchParams: QueryProps }) => {
  // validating status FilterP
  const statuses = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined; // undefined in prisma means it will not include this value while Querying DB

  //validating Orderby SortP
  const orderBy = searchParams.orderBy
    ? { [searchParams.orderBy]: searchParams.arrangement }
    : undefined;

  // validating pagination filter
  const page = parseInt(searchParams.page) || 1;
  const itemsPerPage = 10;
  const skip = (page - 1) * itemsPerPage;

  // DB CALL
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy: orderBy,
    skip: skip,
    take: itemsPerPage, // number of records to fetch
  });

  // Fetching total Records
  const totalissues = await prisma.issue.count({ where: { status } });

  return (
    <div>
      <IssuesToolbar />
      <Text size="1" className="text-gray-500 italic ">
        * Click on Table headers to sort by ascending or descending order
      </Text>
      <IssueTable searchParams={searchParams} issues={issues} />
      <Flex justify="end">
        <Pagination
          itemCount={totalissues}
          itemsPerPage={itemsPerPage}
          currentPage={page}
        />
      </Flex>
    </div>
  );
};

export const dynamic = "force-dynamic"; // whenever visiting this page , revalidate the route
export const metadata: Metadata = {
  title: "Issue Tracker - Issues List",
  description: "View all Project Issues ",
};

export default IssuesPage;
