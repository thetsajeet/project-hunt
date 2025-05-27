import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { auth } from "../lib/auth";
import { ContentfulStatusCode } from "hono/utils/http-status";

type Variables = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};

const authApi = new Hono<{ Variables: Variables }>();

authApi.post("/signin", async (c) => {
  const contentType = c.req.header("Content-Type");
  if (contentType != "application/json")
    throw new HTTPException(400, { message: "Invalid Content-Type" });

  // TODO: Add Zod Validations
  const { email, password } = await c.req.json();
  const response = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
    asResponse: true, // returns a response object instead of data
  });

  if (!response.ok)
    throw new HTTPException(response.status as ContentfulStatusCode, {
      message: response.statusText,
    });

  c.header("Set-Cookie", response.headers.get("Set-Cookie")!);

  return c.json({ message: "ok" }, 200);
});

authApi.post("/signup", async (c) => {
  const contentType = c.req.header("Content-Type");
  if (contentType != "application/json")
    throw new HTTPException(400, { message: "Invalid Content-Type" });

  // TODO: Add Zod Validations
  const { username, email, password } = await c.req.json();
  const response = await auth.api.signUpEmail({
    body: {
      name: username,
      email,
      password,
    },
    asResponse: true, // returns a response object instead of data
  });

  if (!response.ok)
    throw new HTTPException(response.status as ContentfulStatusCode, {
      message: response.statusText,
    });

  c.header("Set-Cookie", response.headers.get("Set-Cookie")!);

  return c.json({ message: "ok" }, 201);
});

authApi.post("/signout", async (c) => {
  const session = c.get("session");

  if (session == null) {
    throw new HTTPException(401, { message: "invalid session" });
  }

  // TODO: Should I validate session id in user's id?

  const response = await auth.api.signOut({
    headers: c.req.raw.headers,
    asResponse: true,
  });

  if (!response.ok)
    throw new HTTPException(response.status as ContentfulStatusCode, {
      message: response.statusText,
    });

  c.header("Set-Cookie", response.headers.get("Set-Cookie")!);

  return c.json({ message: "ok" }, 200);
});

export default authApi;
