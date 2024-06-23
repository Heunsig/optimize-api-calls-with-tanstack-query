import { relations, sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
  deletedAt: text("deletedAt"),
});

export const projectsRelations = relations(projects, ({ many }) => ({
  posts: many(posts),
}));

export const posts = sqliteTable("posts", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
  deletedAt: text("deletedAt"),
  projectId: text("projectId").notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  project: one(projects, {
    fields: [posts.projectId],
    references: [projects.id],
  }),
}));

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
  deletedAt: text("deletedAt"),
});
