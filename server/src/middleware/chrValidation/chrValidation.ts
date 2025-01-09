import type { NextFunction, Request, Response } from "express";

const validateChr = (req: Request, res: Response, next: NextFunction): void => {
  const { name, address, minPrice, maxPrice } = req.body;

  req.body.minPrice = Number(minPrice);
  req.body.maxPrice = Number(maxPrice);

  if (!name || !address || minPrice == null || maxPrice == null) {
    res.status(400).json({ error: "Données manquantes ou invalides" });
    return;
  }

  next();
};

export default validateChr;
