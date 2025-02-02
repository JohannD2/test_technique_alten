import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models.js";

const authRouter = express.Router();
const SECRET_KEY = process.env.SECRET;

import 'dotenv/config'


//create new account
/**
 * @swagger
 * /api/account:
 *   post:
 *     summary: Create a new user account 
 *     tags: [Users]
 *     description: Registers a new user and stores the hashed password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Users'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Users'
 *       400:
 *         description: Bad request
 */


authRouter.post("/account", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({ ...req.body, password: hashedPassword });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//generate new token
/**
 * @swagger
 * /api/token:
 *   post:
 *     summary: Signin
 *     description: signing and get a token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignin'
 *     responses:
 *       201:
 *         description: User signin successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSignin'
 *       400:
 *         description: Bad request
 */

authRouter.post("/token", async (req, res) => {
  const user = await User.findOne({ where: { email: req.body.email } });
  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

export default authRouter
