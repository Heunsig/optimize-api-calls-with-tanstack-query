import express from "express";

const app = express.Router();

app.get("/ping", (req, res) => {
  return res.json({ message: "pong" });
});

export default app;
