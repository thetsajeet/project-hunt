import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { db } from "../db";
import { usersTable } from "../db/schema";
import { eq } from "drizzle-orm";

const usersApi = new Hono();

usersApi
  .get("/", async (c) => {
    const users = await db
      .select({
        email: usersTable.email,
        id: usersTable.id,
        username: usersTable.username,
      })
      .from(usersTable);

    return c.json(
      {
        message: "ok",
        data: {
          users,
        },
      },
      200,
    );
  })
  .get("/:id", async (c) => {
    const userId = +c.req.param("id");
    if (!userId)
      throw new HTTPException(400, { message: `Invalid user id: ${userId}` });

    const user = await db
      .select({
        email: usersTable.email,
        id: usersTable.id,
        username: usersTable.username,
      })
      .from(usersTable)
      .where(eq(usersTable.id, userId));

    return c.json(
      {
        message: `ok`,
        data: {
          user,
        },
      },
      200,
    );
  });

export default usersApi;
