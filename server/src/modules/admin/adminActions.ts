import type { RequestHandler } from "express";

// Import access to data
import adminRepository, { type UserCreate, type User } from "./adminRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all admins
    const admins = await adminRepository.readAll();

    // Respond with the sanitized admins in JSON format
    res.json(admins);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific admin based on the provided ID
    const adminId = Number(req.params.id);
    const admin = await adminRepository.read(adminId);

    // If the admin is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the admin in JSON format
    if (!admin) {
      res.sendStatus(404);
    } else {
      res.json(admin);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The E of BREAD - Edit operation
const edit: RequestHandler = async (req, res, next) => {
  const userId = Number(req.params.id);
  try {
    // Update a specific admin based on the provided ID
    const userData: User = {
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      id: userId,
    };

    const { profile } = await adminRepository.update(userData);

    // If the admin is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the admin in JSON format
    if (!profile) {
      res.sendStatus(404);
    } else {
      res.status(204);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the admin data from the request body
    const userData: UserCreate = {
      email: req.body.email,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    };

    // Create the admin
    const { profile } = await adminRepository.create(userData);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted admin
    res.status(201).json({ profile });
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Delete operation
const destroy: RequestHandler = async (req, res, next) => {
  try {
    // Delete a specific admin based on the provided ID
    const adminId = Number(req.params.id);

    await adminRepository.destroy(adminId);

    // Respond with HTTP 204 (OK)
    res.status(204);
  } catch (error) {
    next(error);
  }
};

export default { browse, read, edit, add, destroy };
