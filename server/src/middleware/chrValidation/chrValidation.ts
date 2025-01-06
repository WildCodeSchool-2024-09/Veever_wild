import type { NextFunction, Request, Response } from "express";

const validateChr = (req: Request, res: Response, next: NextFunction) => {
  const { address, minPrice, maxPrice } = req.body;
  if (!address || minPrice == null || !maxPrice == null) {
    res.status(400).json({ error: "Données manquantes ou invalide" });
  }
  next();
};

export default validateChr;
