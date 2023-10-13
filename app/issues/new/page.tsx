"use client";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IssueForm>();

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-3">
      <TextField.Root>
        <TextField.Input placeholder="Title" size="2" {...register("title")} />
      </TextField.Root>
      {/* Since our md editor does not support additional props so we cannot use register directly */}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE placeholder="Describe your issue..." {...field} />
        )}
      />
      <Button>Submit New Issue</Button>
    </form>
  );
};

export default NewIssuePage;
