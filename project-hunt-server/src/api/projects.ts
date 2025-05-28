import { Hono } from "hono";
import { db } from "../db";
import { project, projectMembers, user } from "../db/schema";
import { eq } from "drizzle-orm";
import { HTTPException } from "hono/http-exception";
import { pgTable } from "drizzle-orm/pg-core";
import { auth } from "../lib/auth";

type Variables = {
  user: typeof auth.$Infer.Session.user | null;
  session: typeof auth.$Infer.Session.session | null;
};

const projectsApi = new Hono<{ Variables: Variables }>();

projectsApi
  .get("/", async (c) => {
    const projectRows = await db
      .select({
        projectId: project.id,
        title: project.title,
        description: project.description,
        userId: user.id,
        username: user.username,
        role: projectMembers.role,
      })
      .from(project)
      .leftJoin(projectMembers, eq(project.id, projectMembers.project_id))
      .leftJoin(user, eq(user.id, projectMembers.user_id));

    let projectMap = new Map();
    let formattedProjects: any[] = [];

    for (let projectRow of projectRows) {
      const projectId = projectRow["projectId"];
      if (!projectId) continue;

      let ind = projectMap.get(projectId);

      if (!ind) {
        formattedProjects.push({
          id: projectId,
          title: projectRow.title,
          description: projectRow.description,
          owners: [],
          members: [],
        });

        ind = formattedProjects.length - 1;
        projectMap.set(projectId, ind);
      }

      const userInfo = {
        userId: projectRow.userId,
        username: projectRow.username,
      };

      if (projectRow["role"] == "member")
        formattedProjects[ind].members.push(userInfo);
      else formattedProjects[ind].owners.push(userInfo);
    }

    return c.json({
      message: "ok",
      data: formattedProjects,
    });
  })
  .get("/:id", async (c) => {
    const projectId = c.req.param("id");
    const projectRows = await db
      .select({
        projectId: project.id,
        title: project.title,
        description: project.description,
        userId: user.id,
        username: user.username,
        role: projectMembers.role,
      })
      .from(project)
      .leftJoin(projectMembers, eq(project.id, projectMembers.project_id))
      .leftJoin(user, eq(user.id, projectMembers.user_id))
      .where(eq(project.id, projectId));

    let projectMap = new Map();
    let formattedProjects: any[] = [];

    for (let projectRow of projectRows) {
      const projectId = projectRow["projectId"];
      if (!projectId) continue;

      let ind = projectMap.get(projectId);

      if (!ind) {
        formattedProjects.push({
          id: projectId,
          title: projectRow.title,
          description: projectRow.description,
          owners: [],
          members: [],
        });

        ind = formattedProjects.length - 1;
        projectMap.set(projectId, ind);
      }
      const userInfo = {
        userId: projectRow.userId,
        username: projectRow.username,
      };

      if (projectRow["role"] == "member")
        formattedProjects[ind].members.push(userInfo);
      else formattedProjects[ind].owners.push(userInfo);
    }

    return c.json({
      message: "ok",
      data: {
        project: formattedProjects.length != 0 ? formattedProjects[0] : {},
      },
    });
  })
  .post("/", async (c) => {
    const { title, description } = await c.req.json();

    const session = c.get("session");
    if (!session) throw new HTTPException(400, { message: "invalid session" });

    const user = c.get("user");

    const result = await db
      .insert(project)
      .values({ id: crypto.randomUUID(), title, description })
      .returning();

    if (result.length == 0)
      throw new HTTPException(500, { message: "unable to create a project" });

    const addUserResult = await db
      .insert(projectMembers)
      .values({ user_id: user!.id, project_id: result[0].id, role: "owner" })
      .returning();

    if (addUserResult.length == 0)
      throw new HTTPException(500, {
        message: "unable to add user to project",
      });

    return c.json(
      {
        message: "ok",
      },
      201,
    );
  });

export default projectsApi;
