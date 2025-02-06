import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Define item-related routes
import validateLogin from "./middlewares/validateLogin";
import verifyToken from "./middlewares/verifyToken";
import userActions from "./modules/user/userActions";
router.post("/api/login", validateLogin, userActions.authenticateUser);
router.get("/api/checkToken", verifyToken, (req, res) => {
  if (!req.user) {
    res.status(401).send("Accès interdit : utilisateur non trouvé");
    return;
  }
  res.status(200).json({ role: req.user.role });
});

import authorizeRole from "./middlewares/authorizeRole";
import adminActions from "./modules/admin/adminActions";
router.get(
  "/api/admins",
  authorizeRole(["admin"]),
  verifyToken,
  adminActions.browse,
);
router.get(
  "/api/admins/:id",
  authorizeRole(["admin"]),
  verifyToken,
  adminActions.read,
);
router.put(
  "/api/admins/:id",
  authorizeRole(["admin"]),
  verifyToken,
  adminActions.edit,
);
router.post(
  "/api/admins",
  authorizeRole(["admin"]),
  verifyToken,
  adminActions.add,
);
router.delete(
  "/api/admins/:id",
  authorizeRole(["admin"]),
  verifyToken,
  adminActions.destroy,
);

import chrActions from "./modules/chr/chrActions";
router.get(
  "/api/chr",
  authorizeRole(["admin", "client"]),
  verifyToken,
  chrActions.browse,
);
router.get(
  "/api/chr/:id",
  authorizeRole(["admin", "client"]),
  verifyToken,
  chrActions.read,
);

import hotelsActions from "./modules/hotels/hotelsActions";
router.get(
  "/api/hotels",
  authorizeRole(["admin", "client"]),
  verifyToken,
  hotelsActions.browse,
);
router.get(
  "/api/hotels/:id",
  authorizeRole(["admin", "client"]),
  verifyToken,
  hotelsActions.read,
);
router.put(
  "/api/hotels/:id",
  authorizeRole(["admin"]),
  verifyToken,
  hotelsActions.edit,
);
router.post(
  "/api/hotels",
  authorizeRole(["admin"]),
  verifyToken,
  hotelsActions.add,
);
router.delete(
  "/api/hotels/:id",
  authorizeRole(["admin"]),
  verifyToken,
  hotelsActions.destroy,
);

import keywordActions from "./modules/keyword/keywordActions";
router.get(
  "/api/keywords",
  authorizeRole(["admin", "client"]),
  verifyToken,
  keywordActions.browse,
);
router.get(
  "/api/keywords/:id",
  authorizeRole(["admin", "client"]),
  verifyToken,
  keywordActions.read,
);
router.put(
  "/api/keywords/:id",
  authorizeRole(["admin"]),
  verifyToken,
  keywordActions.edit,
);
router.post(
  "/api/keywords",
  authorizeRole(["admin"]),
  verifyToken,
  keywordActions.add,
);
router.delete(
  "/api/keywords/:id",
  authorizeRole(["admin"]),
  keywordActions.destroy,
);

import activityActions from "./modules/activities/activityActions";
router.get(
  "/api/activities",
  authorizeRole(["admin", "client"]),
  verifyToken,
  activityActions.browse,
);
router.get(
  "/api/activities/:id",
  authorizeRole(["admin", "client"]),
  verifyToken,
  activityActions.read,
);
router.put(
  "/api/activities/:id",
  authorizeRole(["admin"]),
  verifyToken,
  activityActions.edit,
);
router.post(
  "/api/activities",
  authorizeRole(["admin"]),
  verifyToken,
  activityActions.add,
);
router.delete(
  "/api/activities/:id",
  authorizeRole(["admin"]),
  verifyToken,
  activityActions.destroy,
);

import { checkClientExists } from "./middlewares/checkClientExists/checkClientsExists";
import verifyId from "./middlewares/verifyId";
import clientsActions from "./modules/clients/clientsActions";
router.get("/api/clients", authorizeRole(["admin"]), clientsActions.browse);
router.get(
  "/api/clients/:id",
  authorizeRole(["admin", "client"]),
  verifyToken,
  clientsActions.read,
);
router.post("/api/clients", clientsActions.add);
router.put(
  "/api/clients/:id",
  checkClientExists,
  authorizeRole(["admin", "client"]),
  verifyToken,
  verifyId,
  clientsActions.update,
);
router.delete(
  "/api/clients/:id",
  authorizeRole(["admin", "client"]),
  verifyToken,
  verifyId,
  clientsActions.destroy,
);

import validateChr from "./middlewares/chrValidation/chrValidation";
import restaurantActions from "./modules/restaurant/restaurantActions";
router.get(
  "/api/restaurants",
  authorizeRole(["admin", "client"]),
  verifyToken,
  restaurantActions.browse,
);
router.get(
  "/api/restaurants/:id",
  authorizeRole(["admin", "client"]),
  verifyToken,
  restaurantActions.read,
);
router.put(
  "/api/restaurants/:id",
  authorizeRole(["admin"]),
  verifyToken,
  restaurantActions.edit,
);
router.post(
  "/api/restaurants",
  authorizeRole(["admin"]),
  verifyToken,
  validateChr,
  restaurantActions.add,
);
router.delete(
  "/api/restaurants/:id",
  authorizeRole(["admin"]),
  verifyToken,
  restaurantActions.destroy,
);

import genderActions from "./modules/gender/genderActions";
router.get("/api/genders", genderActions.browse);
router.get("/api/genders/:id", genderActions.read);
router.put(
  "/api/genders/:id",
  authorizeRole(["admin"]),
  verifyToken,
  genderActions.edit,
);
router.post(
  "/api/genders",
  authorizeRole(["admin"]),
  verifyToken,
  genderActions.add,
);
router.delete(
  "/api/genders/:id",
  authorizeRole(["admin"]),
  verifyToken,
  genderActions.destroy,
);

// import passport from "passport";
// import "./Auth/Facebook";

// router.get(
//   "/auth/facebook",
//   passport.authenticate("facebook", { scope: ["email"] }),
// );

// router.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   (req, res) => {
//     if (!req.user) {
//       return res.status(401).redirect("/login");
//     }
//     const token = jwt.sign(
//       { id: req.user.id, role: req.user.role },
//       process.env.JWT_SECRET as string,
//       { expiresIn: "1h" },
//     );
//     res.cookie("token", token, { httpOnly: true, secure: true });
//     res.redirect("http://localhost:3000/");
//   },
// );
// import "./Auth/Google";
// router.get(
//   "/auth/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   }),
// );

// router.get(
//   "/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
//   }),
//   (req, res) => {
//     res.redirect("http://localhost:3000/");
//   },
// );

// router.get("/auth/user", verifyToken, (req, res) => {
//   if (req.user) {
//     res.json(req.user);
//   } else {
//     res.status(401).json({ message: "Non authentifié" });
//   }
// });

/* ************************************************************************* */
export default router;
