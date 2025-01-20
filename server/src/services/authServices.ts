import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

if (!jwtSecret) {
  throw new Error(
    "La clé secrète JWT_SECRET n'est pas définie dans le fichier .env",
  );
}
export function generateToken(payload: object) {
  return jwt.sign(payload, jwtSecret as string, { expiresIn: "1h" });
}
