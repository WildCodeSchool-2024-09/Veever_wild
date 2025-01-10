import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type {
  Restaurant,
  UpdateChrData,
  UpdateResultChr,
  chrData,
} from "../../types/chr/chrData";

class RestaurantRepository {
  // The C of CRUD - Create operation

  async create(chrData: chrData) {
    const connection = await databaseClient.getConnection();
    // Execute the SQL INSERT query to add a new restaurant to the "restaurant" table
    try {
      await connection.beginTransaction();
      const [chrResult] = await connection.query<Result>(
        ` INSERT INTO chr
          (name, address, min_price, max_price) values (?, ?, ?, ?)`,
        [chrData.name, chrData.address, chrData.minPrice, chrData.maxPrice],
      );

      if (!chrResult || !chrResult.insertId) {
        await connection.rollback();
        throw new Error("Insertion échouée");
      }
      const chrId = chrResult.insertId;

      const [restaurantResult] = await connection.query<Result>(
        `INSERT INTO restaurant
         (chr_id) values(?)`,
        [chrId],
      );

      if (!restaurantResult || !restaurantResult.insertId) {
        await connection.rollback();
        throw new Error("Insertion échouée");
      }

      await connection.commit();
      return restaurantResult.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific restaurant by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT chr.address, chr.min_price AS minPrice, chr.max_price AS maxPrice, chr.name AS name
       FROM restaurant 
       INNER JOIN chr
       ON restaurant.chr_id = chr.id
       WHERE restaurant.id = ?`,
      [id],
    );

    return rows[0] as Restaurant;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all restaurants from the "restaurant" table
    const [rows] = await databaseClient.query<Rows>(
      `SELECT chr.address, chr.min_price AS minPrice , chr.max_price AS maxPrice, chr.name AS name
       FROM restaurant
       INNER JOIN chr
       ON restaurant.chr_id = chr.id`,
    );

    // Return the array of restaurants
    return rows as Restaurant[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing restaurant
  async update({ chrId, chrData }: UpdateChrData): Promise<UpdateResultChr> {
    try {
      const [chrResult] = await databaseClient.query<Result>(
        `UPDATE chr
         SET name = ?, address = ?, min_price = ?, max_price = ?
         WHERE id = (SELECT chr_id FROM restaurant WHERE id = ? LIMIT 1)`,
        [
          chrData.name,
          chrData.address,
          chrData.minPrice,
          chrData.maxPrice,
          chrId,
        ],
      );

      if (chrResult.affectedRows === 0) {
        throw new Error(`Aucune mise à jour effectuée pour chrId ${chrId}`);
      }

      return { success: true, chrId, chrData };
    } catch (error) {
      throw new Error("Échec de la mise à jour");
    }
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an restaurant by its ID

  async delete(restaurantId: number): Promise<Result> {
    try {
      const [chrRows] = await databaseClient.query<Result>(
        `DELETE chr, restaurant 
         FROM chr
         INNER JOIN restaurant
         ON restaurant.chr_id = chr.id
         WHERE restaurant.id = ?`,
        [restaurantId],
      );

      if (chrRows.affectedRows === 0) {
        throw new Error("Le restaurant n'existe pas ou est déjà supprimé");
      }

      return chrRows;
    } catch (error) {
      throw new Error("Erreur lors de la supression");
    }
  }
}

export default new RestaurantRepository();
