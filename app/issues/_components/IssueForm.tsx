"use client";
import { ErrorMessage, LoadingSpinner } from "@/app/components";
import { issueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineWarning } from "react-icons/ai";
import { z } from "zod";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";

// dynamically loading markdown component
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type IssueFormData = z.infer<typeof issueSchema>; // infer the types based on the schema

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
    try {
      setIsLoading(true);
      // If issue exists then it's is Editing State
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues");
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error)
        setErrorMessage("An Unexpected Error Occured");
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      {errorMessage && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon>
            <AiOutlineWarning />
          </Callout.Icon>
          <Callout.Text>{errorMessage}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className=" space-y-3">
        <TextField.Root>
          <TextField.Input
            defaultValue={issue?.title}
            placeholder="Title"
            size="2"
            {...register("title")}
          />
        </TextField.Root>
        {/* Error handling for title field */}
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* Since our md editor does not support additional props so we cannot use register directly */}
        <Controller
          defaultValue={issue?.description}
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Describe your issue..." {...field} />
          )}
        />
        {/* error handling for description field*/}
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isLoading}>
          {isLoading ? (
            <>
              Submitting <LoadingSpinner />
            </>
          ) : issue ? (
            "Update Issue"
          ) : (
            "Submit New Issue"
          )}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;