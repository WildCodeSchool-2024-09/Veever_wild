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

import adminActions from "./modules/admin/adminActions";
router.get("/api/admins", adminActions.browse);
router.get("/api/admins/:id", adminActions.read);
router.put("/api/admins/:id", adminActions.edit);
router.post("/api/admins", adminActions.add);
router.delete("/api/admins/:id", adminActions.destroy);

import hotelsActions from "./modules/hotels/hotelsActions";
router.get("/api/hotels", hotelsActions.browse);
router.get("/api/hotels/:id", hotelsActions.read);
router.put("/api/hotels/:id", hotelsActions.edit);
router.post("/api/hotels", hotelsActions.add);
router.delete("/api/hotels/:id", hotelsActions.destroy);

/* ************************************************************************* */

export default router;
