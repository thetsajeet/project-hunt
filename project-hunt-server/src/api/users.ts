import { Hono } from "hono";

const usersApi = new Hono();

usersApi
  .get("/", (c) => {
    return c.json(
      {
        message: "ok",
        data: [],
      },
      200,
    );
  })
  .get("/:id", (c) => {
    const userId = c.req.param("id");

    return c.json(
      {
        message: `ok`,
      },
      200,
    );
  });

export default usersApi;
