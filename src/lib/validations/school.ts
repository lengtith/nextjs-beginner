import { z } from "zod";

export const schoolSchema = z.object({
  name: z.string().trim().min(1, "Name is require"),
  age: z.number().int().min(1, "Age at least 1").max(80, "Age max at 80"),
});
