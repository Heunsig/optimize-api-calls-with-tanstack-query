import express from "express";

const app = express.Router();

app.get("/ping", (req, res) => {
  return res.json({
    status: "success",
    data: "pong",
  });
});

export default app;
