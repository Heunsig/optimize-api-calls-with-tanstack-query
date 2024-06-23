import express from "express";
import session from "express-session";
import { sqlite } from "../db/connection";
import SqliteStore from "better-sqlite3-session-store";

import pingRouter from "./routers/ping";
import authRouter from "./routers/auth";
import projectsRouter from "./routers/projects";
import postsRouter from "./routers/posts";

// TODO: Relocate this to a separate file
declare module "express-session" {
  interface Session {
    userEmail: string;
    authenticated: boolean;
  }
}

const PORT = process.env.PORT || 3000;

const app = express();
const sqliteStore = SqliteStore(session);

app.use(express.json());
app.use(
  session({
    secret: "thisismysecret:!@$%!WDDF@#$%DW@%@$RFV#$#",
    cookie: {
      sameSite: "strict",
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hour,
    },
    store: new sqliteStore({
      client: sqlite,
      expired: { // TODO: Understand what this does
        clear: true,
        intervalMs: 900000
      }
    }),
  })
);
app.use(express.urlencoded({ extended: true }));

app.use(pingRouter);
app.use(authRouter);
app.use(projectsRouter);
app.use(postsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
