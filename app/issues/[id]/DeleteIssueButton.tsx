"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";

const notify = (errorMsg: string) => toast.error(errorMsg);

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  const deleteIssue = async () => {
    try {
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh(); // refetch data when visiting this router
    } catch (error) {
      if (error instanceof Error) {
        notify("Oops! Something went wrong");
        console.log(error.message);
      }
    }
  };
  return (
    <>
      <Toaster />

      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">
            <AiOutlineDelete size={18} />
            Delete Issue
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
              <Button variant="solid" color="red" onClick={deleteIssue}>
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
