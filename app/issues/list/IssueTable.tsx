import { convertDateAndTime } from "@/app/_utils/helper";
import { CustomLink, IssueStatusBadge } from "@/app/components";
import { Issue, Status } from "@prisma/client";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export interface QueryProps {
  status: Status;
  orderBy: keyof Issue;
  arrangement: "asc" | "desc";
  page: string;
}

interface Props {
  searchParams: QueryProps;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  const columns: Array<{
    label: string;
    value: keyof Issue;
    className?: string;
  }> = [
    { label: "Issue", value: "title" },
    { label: "Status", value: "status", className: "hidden sm:table-cell" },
    { label: "Created", value: "createdAt", className: "hidden sm:table-cell" },
  ];
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((col) => {
            return (
              <Table.ColumnHeaderCell key={col.value} className={col.className}>
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
  );
};

export default IssueTable;
