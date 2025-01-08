import type { RequestHandler } from "express";

// Import access to data
import activityRepository from "./activityRepository";

// The B of BREAD - Browse (Read All) operation
const browse: RequestHandler = async (req, res, next) => {
  try {
    // Fetch all activities
    const activities = await activityRepository.readAll();

    // Respond with the activities in JSON format
    res.json(activities);
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The R of BREAD - Read operation
const read: RequestHandler = async (req, res, next) => {
  try {
    // Fetch a specific activity based on the provided ID
    const activityId = Number(req.params.id);
    const activity = await activityRepository.read(activityId);

    // If the activity is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the activity in JSON format
    if (activity == null) {
      res.sendStatus(404);
    } else {
      res.json(activity);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The E of BREAD - Edit operation
const edit: RequestHandler = async (req, res, next) => {
  try {
    const activityId = Number(req.params.id);
    const editActivity = {
      chr_id: Number(req.body.chr_id),
    };
    const updateActivity = await activityRepository.update(
      activityId,
      editActivity,
    );

    if (updateActivity == null) {
      res.sendStatus(404);
    } else {
      res.json(updateActivity);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add: RequestHandler = async (req, res, next) => {
  try {
    // Extract the activity data from the request body
    const newActivity = {
      title: req.body.title,
      chr_id: req.body.chr_id,
    };

    // Create the activity
    const insertId = await activityRepository.create(newActivity);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted activity
    res.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Delete operation
const deleteActivity: RequestHandler = async (req, res, next) => {
  try {
    const activityId = Number(req.params.id);

    const activityDeleted = await activityRepository.delete(activityId);

    if (!activityDeleted) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add };
