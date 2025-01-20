import bcrypt from "bcryptjs";
import type { RequestHandler } from "express";
import { generateToken } from "../../services/authServices";
import userRepository from "./userRepository";

const authenticateUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userRepository.getUserEmailWithRole(email);

    if (!user) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    req.body.password = undefined;

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

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
