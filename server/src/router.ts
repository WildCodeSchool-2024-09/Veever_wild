import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import validateLogin from "./middlewares/validateLogin";
import userActions from "./modules/user/userActions";
router.post("/api/login", validateLogin, userActions.authenticateUser);

import verifyToken from "./middlewares/verifyToken";
router.use("/api", verifyToken);

import authorizeRole from "./middlewares/authorizeRole";
import adminActions from "./modules/admin/adminActions";
router.get("/api/admins", authorizeRole(["admin"]), adminActions.browse);
router.get("/api/admins/:id", authorizeRole(["admin"]), adminActions.read);
router.put("/api/admins/:id", authorizeRole(["admin"]), adminActions.edit);
router.post("/api/admins", authorizeRole(["admin"]), adminActions.add);
router.delete(
  "/api/admins/:id",
  authorizeRole(["admin"]),
  adminActions.destroy,
);

import hotelsActions from "./modules/hotels/hotelsActions";
router.get(
  "/api/hotels",
  authorizeRole(["admin", "client"]),
  hotelsActions.browse,
);
router.get(
  "/api/hotels/:id",
  authorizeRole(["admin", "client"]),
  hotelsActions.read,
);
router.put("/api/hotels/:id", authorizeRole(["admin"]), hotelsActions.edit);
router.post("/api/hotels", authorizeRole(["admin"]), hotelsActions.add);
router.delete(
  "/api/hotels/:id",
  authorizeRole(["admin"]),
  hotelsActions.destroy,
);

import keywordActions from "./modules/keyword/keywordActions";
router.get(
  "/api/keywords",
  authorizeRole(["admin", "client"]),
  keywordActions.browse,
);
router.get(
  "/api/keywords/:id",
  authorizeRole(["admin", "client"]),
  keywordActions.read,
);
router.put("/api/keywords/:id", authorizeRole(["admin"]), keywordActions.edit);
router.post("/api/keywords", authorizeRole(["admin"]), keywordActions.add);
router.delete(
  "/api/keywords/:id",
  authorizeRole(["admin"]),
  keywordActions.destroy,
);

import activityActions from "./modules/activities/activityActions";
router.get(
  "/api/activities",
  authorizeRole(["admin", "client"]),
  activityActions.browse,
);
router.get(
  "/api/activities/:id",
  authorizeRole(["admin", "client"]),
  activityActions.read,
);
router.put(
  "/api/activities/:id",
  authorizeRole(["admin"]),
  activityActions.edit,
);
router.post("/api/activities", authorizeRole(["admin"]), activityActions.add);
router.delete(
  "/api/activities/:id",
  authorizeRole(["admin"]),
  activityActions.destroy,
);

import validateChr from "./middleware/chrValidation/chrValidation";
import restaurantActions from "./modules/restaurant/restaurantActions";
router.get(
  "/api/restaurants",
  authorizeRole(["admin", "client"]),
  restaurantActions.browse,
);
router.get(
  "/api/restaurants/:id",
  authorizeRole(["admin", "client"]),
  restaurantActions.read,
);
router.put(
  "/api/restaurants/:id",
  authorizeRole(["admin"]),
  restaurantActions.edit,
);
router.post(
  "/api/restaurants",
  authorizeRole(["admin"]),
  validateChr,
  restaurantActions.add,
);
router.delete(
  "/api/restaurants/:id",
  authorizeRole(["admin"]),
  restaurantActions.destroy,
);

import genderActions from "./modules/gender/genderActions";
router.get(
  "/api/genders",
  authorizeRole(["admin", "client"]),
  genderActions.browse,
);
router.get(
  "/api/genders/:id",
  authorizeRole(["admin", "client"]),
  genderActions.read,
);
router.put("/api/genders/:id", authorizeRole(["admin"]), genderActions.edit);
router.post("/api/genders", authorizeRole(["admin"]), genderActions.add);
router.delete(
  "/api/genders/:id",
  authorizeRole(["admin"]),
  genderActions.destroy,
);
/* ************************************************************************* */
export default router;
