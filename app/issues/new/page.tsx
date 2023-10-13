"use client";
import { TextField, Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import LoadingSpinner from "@/app/components/LoadingSpinner";

type IssueForm = z.infer<typeof createIssueSchema>; // infer the types based on the schema

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      setIsLoading(true);
      await axios.post("/api/issues", data);
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
            placeholder="Title"
            size="2"
            {...register("title")}
          />
        </TextField.Root>
        {/* Error handling for title field */}
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        {/* Since our md editor does not support additional props so we cannot use register directly */}
        <Controller
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
          ) : (
            "Submit New Issue"
          )}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
