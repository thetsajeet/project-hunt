import { Hono } from "hono";
import { logger } from "hono/logger";
import projectsApi from "./api/projects";
import usersApi from "./api/users";
import { auth } from "./lib/auth";
import authApi from "./api/auth";

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

// Let BetterAuth handle all auth-related requests internally
// api.on(["GET", "POST"], "/auth/*", async (c) => {
//   return await auth.handler(c.req.raw);
// });

// api.route("/auth", authApi);
api.route("/projects", projectsApi);
api.route("/users", usersApi);
api.route("/auth", authApi);

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
