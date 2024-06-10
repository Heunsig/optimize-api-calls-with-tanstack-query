import express from 'express'
import { db } from "../../db/connection";
import { projects, posts } from "../../db/schema";
import { eq, isNull, and } from "drizzle-orm";
import { formatDate } from "../utils/date.util";

const app = express.Router();

app.get("/projects", async (req, res) => {
  const foundProjects = db
    .select({
      id: projects.id,
      name: projects.name,
      description: projects.description,
      createdAt: projects.createdAt,
    })
    .from(projects)
    .where(isNull(projects.deletedAt))
    .all();

  return res.json({
    status: "success",
    data: foundProjects ?? [],
  });
});

app.get("/projects/:id", async (req, res) => {
  const { id } = req.params;

  const project = await db.query.projects.findFirst({
    columns: {
      id: true,
      name: true,
      description: true,
      createdAt: true,
    },
    where: (projects, { eq }) => eq(projects.id, id),
  });

  return res.json({
    status: "success",
    data: project ?? null,
  });
});

app.post("/projects", async (req, res) => {
  const { name, description } = req.body;

  const [insertedId] = await db
    .insert(projects)
    .values({
      name,
      description,
    })
    .returning({ insertedId: projects.id });

  return res.json({
    status: "success",
    data: insertedId,
  });
});

app.patch("/projects/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  const [updatedId] = await db
    .update(projects)
    .set({
      name,
      description,
    })
    .where(eq(projects.id, id))
    .returning({ updatedId: projects.id });

  return res.json({
    status: "success",
    data: updatedId,
  });
});

app.delete("/projects/:id", async (req, res) => {
  const { id } = req.params;

  const [deletedId] = await db
    .update(projects)
    .set({
      deletedAt: formatDate(new Date()),
    })
    .where(eq(projects.id, id))
    .returning({ deletedId: projects.id });

  return res.json({
    status: "success",
    data: deletedId,
  });
});

export default app;