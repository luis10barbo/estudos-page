import { z } from "zod";

export const zodBaseTypes = z.union([
  z.literal("decimal"),
  z.literal("hexadecimal"),
  z.literal("binary"),
]);
export type BaseTypes = z.infer<typeof zodBaseTypes>;

export const zodConversionObject = z.object({
  from: zodBaseTypes,
  to: zodBaseTypes,
});
export type ConversionObject = z.infer<typeof zodConversionObject>;
