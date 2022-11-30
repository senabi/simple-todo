import { router } from "../trpc";
import { exampleRouter } from "./example";
import { todoRouter } from "./todo";

export const appRouter = router({
  example: exampleRouter,
  todo: todoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
