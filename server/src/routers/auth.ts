import express from "express";
import { z } from "zod";
import { db } from "../../db/connection";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { users } from "../../db/schema";
import { isAuthenticated, isNotAuthenticated } from "../middleware/authentication-middleware";

const app = express.Router();

const scrypt = promisify(_scrypt);

const authInfoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});



app.post("/signup", async (req, res) => {
  const parsedBody = authInfoSchema.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(400).json({
      status: "error",
      message: parsedBody.error.errors,
    });
  }

  const { email, password } = parsedBody.data;

  const user = await db.query.users.findFirst({
    columns: {
      email: true,
    },
    where: (users, { eq }) => eq(users.email, email),
  });

  if (user) {
    return res.status(400).json({
      status: "error",
      message: "User already exists with this email",
    });
  }

  const salt = randomBytes(8).toString("hex");

  const hash = (await scrypt(password, salt, 32)) as Buffer;

  const hashedPassword = `${salt}.${hash.toString("hex")}`;

  const [newUserEmail] = await db
    .insert(users)
    .values({
      email: email,
      password: hashedPassword,
    })
    .returning({ email: users.email });

  return res.json({
    status: "success",
    data: newUserEmail,
  });
});

app.post("/signin", [isNotAuthenticated], async (req, res) => {
  const parsedBody = authInfoSchema.safeParse(req.body);
  if (!parsedBody.success) {
    return res.status(400).json({
      status: "error",
      message: parsedBody.error.errors,
    });
  }

  const { email, password } = parsedBody.data;

  const user = await db.query.users.findFirst({
    columns: {
      email: true,
      password: true,
    },
    where: (users, { eq }) => eq(users.email, email),
  });

  if (!user) {
    return res.status(400).json({
      status: "error",
      message: "User not found",
    });
  }

  const [salt, storedHash] = user.password.split(".");
  const hash = (await scrypt(password, salt, 32)) as Buffer;

  if (storedHash !== hash.toString("hex")) {
    return res.status(400).json({
      status: "error",
      message: "Invalid password",
    });
  }

  req.session.userEmail = user.email;
  req.session.authenticated = true;

  return res.json({
    status: "success",
  });
});

app.post("/signout", [isAuthenticated], (req, res) => {
  req.session.destroy(() => {
    console.log("Session destroyed");
  });

  return res.json({
    status: "success",
  });
});

export default app;
