import type { NextFunction, Request, Response } from "express";

const validateChr = (req: Request, res: Response, next: NextFunction): void => {
  const { name, address, minPrice, maxPrice } = req.body;


  if (typeof name !== "string" || name.trim() === "") {
    res.status(400).json({
      error: "Le champ 'name' est requis et doit être une chaîne non vide.",
    });
    return;
  }

  if (typeof address !== "string" || address.trim() === "") {
    res.status(400).json({
      error: "Le champ 'address' est requis et doit être une chaîne non vide.",
    });
    return;
  }

  const parsedMinPrice = Number(minPrice);
  const parsedMaxPrice = Number(maxPrice);

  if (Number.isNaN(parsedMinPrice) || Number.isNaN(parsedMaxPrice)) {
    res.status(400).json({
      error:
        "Les champs 'minPrice' et 'maxPrice' doivent être des nombres valides.",
    });
    return;
  }

  if (parsedMinPrice < 0) {
    res
      .status(400)
      .json({ error: "'minPrice' doit être supérieur ou égal à 0." });
    return;
  }

  if (parsedMaxPrice < parsedMinPrice) {
    res
      .status(400)
      .json({ error: "'maxPrice' doit être supérieur ou égal à 'minPrice'." });
    return;
  }

  req.body.minPrice = parsedMinPrice;
  req.body.maxPrice = parsedMaxPrice;
  req.body.name = name.trim();
  req.body.address = address.trim();

  next();
};

export default validateChr;
