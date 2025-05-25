import { Hono } from "hono";
import { logger } from "hono/logger";
import projectsApi from "./api/projects";
import usersApi from "./api/users";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.json(
    {
      message: "hello world",
    },
    200,
  );
});

const api = new Hono().basePath("/api");

api.route("/projects", projectsApi);
api.route("/users", usersApi);

app.route("/", api);

app.all("*", (c) => {
  return c.json(
    {
      message: "route not found",
      log: {
        method: c.req.method,
        url: c.req.path,
      },
    },
    404,
  );
});

export default app;
