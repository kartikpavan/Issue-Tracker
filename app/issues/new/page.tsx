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

type IssueForm = z.infer<typeof createIssueSchema>; // infer the types based on the schema

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isLoading, isSubmitted },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      if (error instanceof Error)
        setErrorMessage("An Unexpected Error Occured");
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
        {errors.title && (
          <Text color="red" as="p">
            {errors.title.message}
          </Text>
        )}
        {/* Since our md editor does not support additional props so we cannot use register directly */}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Describe your issue..." {...field} />
          )}
        />
        {/* error handling for title field*/}
        {errors.description && (
          <Text color="red" as="p">
            {errors.description.message}
          </Text>
        )}

        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
