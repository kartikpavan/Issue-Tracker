"use client";
import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AsigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60 * 1000, // 60 seconds
    retry: 3,
  });

  // API call to assign user with an issue
  const assignIssueToUser = (userId: string) => {
    axios
      .patch(`/api/issues/${issue.id}`, {
        assignedToUserId: userId === " " ? null : userId,
      })
      .then(() => {
        const matchedUser = users?.find((user) => user.id === userId);
        if (!matchedUser) {
          toast(`Issue Unassigned`);
        } else {
          toast.success(`Issue assigned to ${matchedUser?.name}`);
        }
      })
      .catch(() => {
        toast.error("Changes could not be saved");
      });
  };

  if (isLoading) return <Skeleton height={"2rem"} />;

  if (error) return null;

  return (
    <>
      <Select.Root
        defaultValue={issue.assignedToUserId || ""}
        onValueChange={(userId) => assignIssueToUser(userId)}
      >
        <Select.Trigger placeholder="Assign User" className="text-black" />
        <Select.Content position="popper">
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value=" ">Unassigned</Select.Item>
            {users?.map((user) => {
              return (
                <Select.Item key={user.id} value={user.id}>
                  {user.name}
                </Select.Item>
              );
            })}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AsigneeSelect;
