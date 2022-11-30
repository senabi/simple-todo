import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const getTodosQuery = trpc.todo.getAll.useQuery();
  const addTodoMutation = trpc.todo.add.useMutation({
    onSuccess: (t) => {
      getTodosQuery.refetch();
    },
  });
  const [text, setText] = useState("");
  console.log("home");
  return (
    <>
      <Head>
        <title>Todo App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#22085f] to-[#341129]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Todos
          </h1>
          <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white">
            <h3 className="text-2xl font-bold">Write todo</h3>
            <div className="text-lg">
              <input
                className="rounded-lg border border-gray-500 bg-transparent p-1"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <button
              className="rounded-lg border border-gray-500 p-1 hover:bg-white/20"
              onClick={() => {
                addTodoMutation.mutate({
                  text,
                });
              }}
            >
              Send
            </button>
          </div>
          {getTodosQuery.isLoading ? (
            <div className="text-white">Loading...</div>
          ) : (
            <>
              {getTodosQuery.data?.map((todo) => (
                <div
                  key={todo.id}
                  className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white "
                >
                  <h3 className="text-2xl font-bold">{todo.content}</h3>
                </div>
              ))}
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
