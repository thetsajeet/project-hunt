import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import { db } from "../db";
import { user, user as UserTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { auth } from "../lib/auth";
import { ContentfulStatusCode } from "hono/utils/http-status";

const authApi = new Hono();

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

  console.log(response);

  if (!response.ok)
    throw new HTTPException(response.status as ContentfulStatusCode, {
      message: response.statusText,
    });

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

  console.log(response);

  if (!response.ok)
    throw new HTTPException(response.status as ContentfulStatusCode, {
      message: response.statusText,
    });

  return c.json({ message: "ok" }, 201);
});

authApi.post("/signout", async (c) => {
  const response = await auth.api.signOut({
    headers: c.req.raw.headers,
    asResponse: true,
  });

  console.log(response);

  if (!response.ok)
    throw new HTTPException(response.status as ContentfulStatusCode, {
      message: response.statusText,
    });

  return c.json({ message: "ok" }, 200);
});

export default authApi;
