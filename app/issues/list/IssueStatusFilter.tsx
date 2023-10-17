"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React from "react";

const statuses: Array<{ label: string; value?: Status }> = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(selectedStatus) => {
        const query = selectedStatus ? `?status=${selectedStatus}` : "";
        router.push("/issues/list" + query);
      }}
    >
      <Select.Trigger placeholder="Filter By ..." />
      <Select.Content position="popper">
        <Select.Group>
          <Select.Label>Status</Select.Label>
          {statuses.map((status) => {
            return (
              <Select.Item key={status.value} value={status?.value || " "}>
                {status.label}
              </Select.Item>
            );
          })}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
