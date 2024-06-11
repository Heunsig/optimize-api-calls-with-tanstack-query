import express from 'express'
import { db } from "../../db/connection";
import { projects, posts } from "../../db/schema";
import { eq, isNull, and } from "drizzle-orm";
import { formatDate } from "../utils/date.util";

const app = express.Router();

app.get("/posts", async (req, res) => {
  const { projectId } = req.query;
  const _projectId = projectId?.toString();

  let foundPosts: Array<{
    id: string;
    title: string;
    content: string;
    createdAt: string;
  }> = [];
  if (_projectId) {
    foundPosts = db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .where(and(isNull(posts.deletedAt), eq(posts.projectId, _projectId)))
      .all();
  } else {
    const sq = db
      .select()
      .from(projects)
      .where(isNull(projects.deletedAt))
      .as("sq");

    foundPosts = await db
      .select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .innerJoin(sq, eq(posts.projectId, sq.id));
  }

  return res.json({
    status: "success",
    data: foundPosts ?? [],
  });
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;

  const post = await db.query.posts.findFirst({
    columns: {
      id: true,
      title: true,
      content: true,
      createdAt: true,
    },
    where: (posts, { eq }) => eq(posts.id, id),
  });

  return res.json({
    status: "success",
    data: post ?? null,
  });
});

app.post("/posts", async (req, res) => {
  const { projectId, title, content } = req.body;

  if (title === "") {
    return res.status(400).json({
      status: "error",
      message: "Title is required",
    });
  }

  const [insertedId] = await db
    .insert(posts)
    .values({
      projectId,
      title,
      content,
    })
    .returning({ insertedId: posts.id });

  return res.json({
    status: "success",
    data: insertedId,
  });
});

app.patch("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (title === "") {
    return res.status(400).json({
      status: "error",
      message: "Title is required",
    });
  }

  const [updatedId] = await db
    .update(posts)
    .set({
      title,
      content,
    })
    .where(eq(posts.id, id))
    .returning({ updatedId: posts.id });

  return res.json({
    status: "success",
    data: updatedId,
  });
});

app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  const [deletedId] = await db
    .update(posts)
    .set({
      deletedAt: formatDate(new Date()),
    })
    .where(eq(posts.id, id))
    .returning({ deletedId: posts.id });

  return res.json({
    status: "success",
    data: deletedId,
  });
});

export default app;
