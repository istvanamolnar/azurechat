import { refineFromEmpty } from "@/features/common/schema-validation";
import { z } from "zod";

export const CHAT_DOCUMENT_ATTRIBUTE = "CHAT_DOCUMENT";

export type DocumentModel = z.infer<typeof DocumentModelSchema>;

export const DocumentModelSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .min(1, {
      message: "Title cannot be empty",
    })
    .refine(refineFromEmpty, "Title cannot be empty"),
  chatThreadId: z.string().optional(),
  userId: z.string(),
  isDeleted: z.boolean(),
  isPublished: z.boolean(),
  createdAt: z.date(),
  type: z.literal(CHAT_DOCUMENT_ATTRIBUTE),
});
