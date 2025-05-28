import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { db } from "../db";
import { user as UserTable } from "../db/schema";
import { eq } from "drizzle-orm";
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

    const userData = await db
      .select({
        email: UserTable.email,
        id: UserTable.id,
        username: UserTable.username,
      })
      .from(UserTable)
      .where(eq(UserTable.id, userId))
      .limit(1);

    if (userData.length == 0)
      throw new HTTPException(404, {
        message: "user not found",
      });

    return c.json(
      {
        message: `ok`,
        data: {
          user: userData[0],
        },
      },
      200,
    );
  });

export default usersApi;
