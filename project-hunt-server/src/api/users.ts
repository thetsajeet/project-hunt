import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { db } from "../db";
import { user as UserTable } from "../db/schema";
import { eq } from "drizzle-orm";
import { auth } from "../lib/auth";
import { HonoRouterVariables } from "../../global";

const usersApi = new Hono<{ Variables: HonoRouterVariables }>();

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
  .put("/:id", async (c) => {
    const session = c.get("session");
    const user = c.get("user");

    if (!session || !user)
      throw new HTTPException(400, { message: "Invalid user session" });
    // TODO: Update db
  })
  .delete("/:id", async (c) => {
    // TODO: Update db
  });

export default usersApi;
