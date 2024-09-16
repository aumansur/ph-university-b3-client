import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Please enter a semester" }),
  year: z.string({ required_error: "Please enter a Year" }),
  startMonth: z.string({ required_error: "Please enter a Start Month" }),
  endMonth: z.string({ required_error: "Please enter a end month" }),
});
