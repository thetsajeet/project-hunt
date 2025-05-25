import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.json(
    {
      message: "hello world",
    },
    200,
  );
});

export default app;
