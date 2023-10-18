import prisma from "@/prisma/client";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { convertDateAndTime } from "../../_utils/helper";
import { CustomLink, IssueStatusBadge } from "../../components";
import IssuesToolbar from "./IssuesToolbar";
import Pagination from "@/app/components/Pagination";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: {
    status: Status;
    orderBy: keyof Issue;
    arrangement: "asc" | "desc";
    page: string;
  };
}) => {
  const columns: Array<{
    label: string;
    value: keyof Issue;
    className?: string;
  }> = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden sm:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden sm:table-cell" },
  ];

  // validating status Filter
  const statuses = ["OPEN", "IN_PROGRESS", "CLOSED"];
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined; // undefined in prisma means it will not include this value while Querying DB

  //validating Orderby Sort
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
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            {columns.map((col) => {
              return (
                <Table.ColumnHeaderCell
                  key={col.value}
                  className={col.className}
                >
                  {/* Preserving the previous query parameters and adding new one using spread op */}
                  <Link
                    href={{
                      query: {
                        ...searchParams,
                        orderBy: col.value,
                        arrangement:
                          searchParams?.arrangement === "asc" ? "desc" : "asc",
                      },
                    }}
                  >
                    {col.label}
                  </Link>

                  {col.value === searchParams.orderBy ? (
                    searchParams.arrangement === "asc" ? (
                      <AiOutlineArrowUp className="inline-block space-x-2" />
                    ) : (
                      <AiOutlineArrowDown className="inline-block space-x-2" />
                    )
                  ) : null}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue, idx) => {
            return (
              <Table.Row key={issue.id}>
                <Table.Cell>
                  <CustomLink href={`/issues/${issue.id}`}>
                    {issue.title}
                  </CustomLink>
                  <div className="block sm:hidden mt-1">
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </Table.Cell>
                <Table.Cell className="hidden sm:table-cell">
                  <IssueStatusBadge status={issue.status} />
                </Table.Cell>
                <Table.Cell className="hidden sm:table-cell">
                  {/* Make this human readable form */}
                  {convertDateAndTime(issue.createdAt)}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
      <Pagination
        itemCount={totalissues}
        itemsPerPage={itemsPerPage}
        currentPage={page}
      />
    </div>
  );
};

export const dynamic = "force-dynamic";
// export const revalidate = 0;
export default IssuesPage;
