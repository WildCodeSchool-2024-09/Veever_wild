import type { RequestHandler } from "express";

// Import access to data
import hotelRepository from "./hotelsRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all hotels
    const hotels = await hotelRepository.readAll();

    // Respond with the hotels in JSON format
    res.json(hotels);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific hotel based on the provided ID
    const hotelId = Number(req.params.id);

    const hotel = await hotelRepository.read(hotelId);

    // If the hotel is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the hotel in JSON format
    if (hotel == null) {
      res.sendStatus(404);
    } else {
      res.json(hotel);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    const hotelId = Number(req.params.id);
    const chrId = Number(req.body.chr_id);
    const chrData = {
      address: req.body.address,
      minPrice: req.body.minPrice,
      maxPrice: req.body.maxPrice,
    };

    const updateHotel = await hotelRepository.update(hotelId, chrId, chrData);

    if (updateHotel == null) {
      res.sendStatus(204);
    } else {
      res.json(updateHotel);
    }
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const hotelId = Number(req.params.id);
    await hotelRepository.delete(hotelId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    const newHotel = {
      chr_id: req.body.chr_id,
      address: req.body.address,
      minPrice: req.body.minPrice,
      maxPrice: req.body.maxPrice,
    };
    const insertId = await hotelRepository.create(newHotel);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, edit, destroy };
