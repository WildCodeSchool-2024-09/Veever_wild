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
router.use(verifyToken);

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

/* ************************************************************************* */

export default router;
