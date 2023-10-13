"use client";
import { TextArea, TextField, Button } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" size="2" />
      </TextField.Root>
      <TextArea placeholder="Describe your issue..." />
      <Button>Submit New Issue</Button>
    </div>
  );
};

export default NewIssuePage;
