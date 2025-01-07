import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type { Restaurant, chrData } from "../../types/chr/chrData";

class RestaurantRepository {
  // The C of CRUD - Create operation

  async create(chrData: chrData) {
    const connection = await databaseClient.getConnection();
    // Execute the SQL INSERT query to add a new restaurant to the "restaurant" table
    try {
      await connection.beginTransaction();
      const [chrResult] = await connection.query<Result>(
        ` INSERT INTO chr
          (address, min_price, max_price) values (?, ?, ?)`,
        [chrData.address, chrData.minPrice, chrData.maxPrice],
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

      if (!restaurantResult || restaurantResult.insertId) {
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
      `SELECT chr.address, chr.min_Price AS minPrice, chr.max_Price AS maxPrice
       FROM restaurant 
       INNER JOIN chr
       ON restaurant.chr_id = chr_id
       WHERE restaurant.id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the restaurant
    return rows[0] as Restaurant;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all restaurants from the "restaurant" table
    const [rows] = await databaseClient.query<Rows>(
      `SELECT chr.address, chr.min_price AS minPrice , chr.max_price AS maxPrice
       FROM restaurant
       INNER JOIN chr
       ON restaurant.chr_id = chr.id`,
    );

    // Return the array of restaurants
    return rows as Restaurant[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing restaurant
  async update({
    restaurantId,
    chrId,
    chrData,
  }: {
    restaurantId: number;
    chrId: number;
    chrData: chrData;
  }): Promise<{
    chrId: number;
    chrData: chrData;
  }> {
    const connection = await databaseClient.getConnection();

    try {
      const [chrResult] = await connection.query<Result>(
        `UPDATE chr
         SET address = ?, minPrice = ?, maxPrice = ?
         WHERE id = ?`,
        [chrData.address, chrData.minPrice, chrData.maxPrice, chrId],
      );

      if (chrResult.affectedRows !== 1) {
        throw new Error(
          `Erreur lors de la mise à jour de 'chr'. affectedRows: ${chrResult.affectedRows}`,
        );
      }

      const [restaurantResult] = await connection.query<Result>(
        `UPDATE restaurant
         SET chr_id = ?
         WHERE id = ?`,
        [chrId, restaurantId],
      );

      if (restaurantResult.affectedRows !== 1) {
        throw new Error(
          `Erreur lors de la suppression dans 'restaurant'. affectedRows: ${restaurantResult.affectedRows}`,
        );
      }

      await connection.commit();

      return { chrId, chrData };
    } catch (error) {
      throw new Error("Echec de la mise à jour");
    } finally {
      connection.release();
    }
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an restaurant by its ID

  async delete(id: number): Promise<Result> {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();

      const [chrRows] = await connection.query<Rows>(
        `SELECT chr_id 
         FROM restaurant
         WHERE id = ?`,
        [id],
      );

      if (chrRows.length === 0) {
        await connection.rollback();
        throw new Error("Le restaurant n'existe pas ou est déjà supprimé");
      }

      const chrId = chrRows[0].chr_id;

      const [chrResult] = await connection.query<Result>(
        `DELETE FROM chr
         WHERE id = ?`,
        [chrId],
      );

      if (chrResult.affectedRows !== 1) {
        await connection.rollback();
        throw new Error(
          `Erreur lors de la suppression dans 'chr'. affectedRows: ${chrResult.affectedRows}`,
        );
      }

      const [restaurantResult] = await connection.query<Result>(
        `DELETE FROM restaurant
         WHERE id = ?`,
        [id],
      );

      if (restaurantResult.affectedRows !== 1) {
        await connection.rollback();
        throw new Error(
          `Erreur lors de la suppression du restaurant. affectedRows: ${restaurantResult.affectedRows}`,
        );
      }

      await connection.commit();
      return restaurantResult;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}

export default new RestaurantRepository();
