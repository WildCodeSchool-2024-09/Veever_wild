import express from "express";
import databaseClient, { type Result, type Rows } from "../database/client";

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

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [result] = await databaseClient.query<Rows>(
      `
    SELECT email, password
    FROM user
    WHERE email = ?
    `,
      [email],
    );

    if (result.length === 0) {
      res.status(404).json({ message: "Email non trouvé" });
    }

    const user = result[0];

    if (user.password !== password) {
      res.sendStatus(401).json({ message: "Mot de passe incorrect" });
    }

    res.status(200).json({ message: "Connexion réussie" });
  } catch (error) {
    res.sendStatus(500);
  }
});

/* ************************************************************************* */

export default router;
