"use client";
import { LoadingSpinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";

const notify = (errorMsg: string) => toast.error(errorMsg);

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const deleteIssue = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      setIsDeleting(false);
      router.push("/issues/list");
      router.refresh(); // refetch data when visiting this router
    } catch (error) {
      if (error instanceof Error) {
        notify("Oops! Something went wrong");
        setIsDeleting(false);
      }
    }
  };
  return (
    <>
      <Toaster />
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button className="bg-red-500 text-white">
            <AiOutlineDelete size={18} />
            Delete Issue
            {isDeleting && <LoadingSpinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This Issue will no longer be accessible.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button className="bg-red-500 text-white" onClick={deleteIssue}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
