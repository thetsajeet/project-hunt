import { Hono } from "hono";

const projectsApi = new Hono();

projectsApi
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
    const projectId = c.req.param("id");

    return c.json(
      {
        message: `ok`,
      },
      200,
    );
  });

export default projectsApi;
