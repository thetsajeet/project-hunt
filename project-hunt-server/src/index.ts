import { Hono } from "hono";
import { logger } from "hono/logger";
import projectsApi from "./api/projects";
import usersApi from "./api/users";
import { auth } from "./lib/auth";
import authApi from "./api/auth";

type Variables = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};

const app = new Hono<{ Variables: Variables }>();

app.use(logger());
app.use(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("session", null);
    c.set("user", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);

  return next();
});

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
