import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  "OPEN" | "IN_PROGRESS" | "CLOSED", // keys
  { label: string; color: "red" | "violet" | "green" } //  values
> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({
  status,
}: {
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
}) => {
  return (
    <>
      <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
    </>
  );
};

export default IssueStatusBadge;
