import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import itemActions from "./modules/item/itemActions";

router.get("/api/items", itemActions.browse);
router.get("/api/items/:id", itemActions.read);
router.post("/api/items", itemActions.add);

// Defin admin-related routes
import adminActions from "./modules/admin/adminActions";
router.get("/api/admins", adminActions.browse);
router.get("/api/admins/:id", adminActions.read);
router.put("/api/admins/:id", adminActions.edit);
router.post("/api/admins", adminActions.add); //test
router.delete("/api/admins/:id", adminActions.destroy);

import hotelsActions from "./modules/hotels/hotelsActions";
router.get("/api/hotels", hotelsActions.browse);
router.get("/api/hotels/:id", hotelsActions.read);
router.put("/api/hotels/:id", hotelsActions.edit);
router.post("/api/hotels", hotelsActions.add);
router.delete("/api/hotels/:id", hotelsActions.destroy);

import activityActions from "./modules/activities/activityActions";
router.get("/api/activities", activityActions.browse);
router.get("/api/activities/:id", activityActions.read);
router.put("/api/activities/:id", activityActions.edit);
router.post("/api/activities", activityActions.add);
router.delete("/api/activities/:id", activityActions.destroy);

/* ************************************************************************* */

export default router;
