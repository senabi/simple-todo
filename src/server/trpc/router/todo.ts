import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const todoRouter = router({
  add: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.todo.create({
        data: {
          content: input.text,
        },
      });
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.todo.findMany();
  }),
});
