import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";
import { AiOutlinePlus } from "react-icons/ai";

const IssuesToolbar = () => {
  return (
    <Flex mb="5" justify="between">
      {/* Filter Issue Dropdown */}
      <IssueStatusFilter />
      {/* Create Issue btn */}
      <Button>
        <AiOutlinePlus size={22} className="hidden sm:block" />
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </Flex>
  );
};

export default IssuesToolbar;
