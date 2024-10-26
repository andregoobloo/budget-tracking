import { z } from "zod";

export const CreateCategorySchema = z.object({
  name: z.string().min(2).max(30),
  icon: z.string().max(25),
  type: z.enum(["income", "expense"]),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;
