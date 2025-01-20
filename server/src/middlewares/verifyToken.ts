import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error(
    "La clé secrète JWT_SECRET n'est pas définie dans le fichier .env",
  );
}

const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Accès non autorisé, token manquant." });
  }

  try {
    const decoded = jwt.verify(token as string, jwtSecret as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalide ou expiré. " });
  }
};

export default verifyToken;
