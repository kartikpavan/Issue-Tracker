import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(65335),
  status: z.string().optional(),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  description: z
    .string()
    .min(1, "Description is required")
    .max(65335)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "User id assignment is required")
    .max(255)
    .optional()
    .nullable(),
});
