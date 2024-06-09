import { sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { text, sqliteTable } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable("posts", {
  id: text("id").$defaultFn(() => createId()),
  title: text("title").notNull(),
  content: text("content"),
  createdAt: text("createdAt").default(sql`(CURRENT_TIMESTAMP)`),
  deletedAt: text("deletedAt")
});
