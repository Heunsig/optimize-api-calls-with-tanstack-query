import express from "express";

import pingRouter from "./routers/ping";
import projectsRouter from "./routers/projects";
import postsRouter from "./routers/posts";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(pingRouter);
app.use(projectsRouter);
app.use(postsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
