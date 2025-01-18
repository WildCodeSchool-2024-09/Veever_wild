import bcrypt from "bcryptjs";
import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import userRepository from "./userRepository";

const authenticateUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userRepository.getUserEmailWithRole(email);

    if (!user) {
      res.sendStatus(404);
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.sendStatus(401);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" },
    );

    res.status(200).json({
      message: "Connexion réussie",
      role: user.role,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export default { authenticateUser };
