import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { db } from "../db";
import { user as UserTable } from "../db/schema";
import { eq } from "drizzle-orm";

const usersApi = new Hono();

usersApi
  .get("/", async (c) => {
    const users = await db
      .select({
        email: UserTable.email,
        id: UserTable.id,
        username: UserTable.username,
      })
      .from(UserTable);

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
    const userId = c.req.param("id");
    if (!userId)
      throw new HTTPException(400, { message: `Invalid user id: ${userId}` });

    const user = await db
      .select({
        email: UserTable.email,
        id: UserTable.id,
        username: UserTable.username,
      })
      .from(UserTable)
      .where(eq(UserTable.id, userId));
    return c.json(
      {
        message: `ok`,
        data: {
          user,
        },
      },
      200,
    );
  })
  .put("/:id", async (c) => {})
  .delete("/:id", async (c) => {});

export default usersApi;
