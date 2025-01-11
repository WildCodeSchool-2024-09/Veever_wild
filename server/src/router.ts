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

import hotelsActions from "./modules/hotels/hotelsActions";
router.get("/api/hotels", hotelsActions.browse);
router.get("/api/hotels/:id", hotelsActions.read);
router.put("/api/hotels/:id", hotelsActions.edit);
router.post("/api/hotels", hotelsActions.add);
router.delete("/api/hotels/:id", hotelsActions.destroy);

import validateChr from "./middleware/chrValidation/chrValidation";
import restaurantActions from "./modules/restaurant/restaurantActions";
router.get("/api/restaurants", restaurantActions.browse);
router.get("/api/restaurants/:id", restaurantActions.read);
router.put("/api/restaurants/:id", restaurantActions.edit);
router.post("/api/restaurants", validateChr, restaurantActions.add);
router.delete("/api/restaurants/:id", restaurantActions.destroy);
/* ************************************************************************* */
export default router;
