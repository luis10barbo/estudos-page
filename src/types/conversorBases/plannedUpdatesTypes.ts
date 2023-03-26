import { z } from "zod";

export const zodPageUpdates = z.object({
  title: z.string(),
  status: z.union([
    z.literal("onhold"),
    z.literal("pending"),
    z.literal("completed"),
  ]),
});
export type PageUpdates = z.infer<typeof zodPageUpdates>;
