import express from "express";
import { db } from "../db/connection";
import { posts } from "../db/schema";
import { eq, not, sql, isNull } from "drizzle-orm";
import { title } from "process";
import { formatDate } from "./utils/date.util";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/ping", (req, res) => {
  return res.json({ message: "pong" });
});

app.get("/posts", async (req, res) => {
  const foundPosts = db
    .select()
    .from(posts)
    .where(isNull(posts.deletedAt))
    .all();

  return res.json({
    status: "success",
    data: foundPosts ?? [],
  });
});

app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;

  const post = await db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, id),
  });

  return res.json({
    status: "success",
    data: post ?? null,
  });
});

app.post("/posts", async (req, res) => {
  const { title, content } = req.body;

  const [insertedId] = await db
    .insert(posts)
    .values({
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
