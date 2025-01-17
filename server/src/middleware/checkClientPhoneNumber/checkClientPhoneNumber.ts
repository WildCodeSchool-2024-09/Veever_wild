import type { NextFunction, Request, Response } from "express";
import databaseClient, { type Rows } from "../../../database/client";

export const checkClientPhoneNumber = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const clientId = req.params.id;
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT user_id FROM client
      WHERE id = ?
      `,
      [clientId],
    );

    if (rows.length === 0) {
      res.status(404).json({ error: "Client not found" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
