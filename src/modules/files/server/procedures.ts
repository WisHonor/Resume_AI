import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from "zod";

export const fileRouter = createTRPCRouter({
  createFile: protectedProcedure
    .input(
      z.object({
        fileUrl: z.string().url(),
        fileName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.file.create({
        data: {
          userId: ctx.user.id, // from Clerk, not client
          fileUrl: input.fileUrl,
          fileName: input.fileName,
        },
      });
    }),
});
