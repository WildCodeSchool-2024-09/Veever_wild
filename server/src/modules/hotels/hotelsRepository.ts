import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";
import type {
  ChrData,
  Hotels,
  UpdateResponse,
} from "../../types/HotelTypes/HotelTypes";
class HotelsRepository {
  // The C of CRUD - Create operation
  async create(chrData: ChrData) {
    const connection = await databaseClient.getConnection();
    // Execute the SQL INSERT query to add a new hotel to the "hotel" table
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

      const [hotelResult] = await connection.query<Result>(
        `INSERT INTO hotel
         (chr_id) values(?)`,
        [chrId],
      );

      if (!hotelResult || !hotelResult.insertId) {
        await connection.rollback();
        throw new Error("Insertion échouée");
      }

      await connection.commit();
      return hotelResult.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // The Rs of CRUD - Read operations
  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific hotel by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT chr.name, chr.address, chr.min_price, chr.max_price
       FROM hotel 
       INNER JOIN chr
       ON hotel.chr_id = chr.id
       WHERE hotel.id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the hotel
    return rows[0] as Hotels;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all hotels from the "hotel" table
    const [rows] = await databaseClient.query<Rows>(
      `SELECT chr.name, chr.address, chr.min_price, chr.max_price
       FROM hotel
       INNER JOIN chr
       ON hotel.chr_id = chr.id`,
    );

    // Return the array of hotels
    return rows as Hotels[];
  }

  // The U of CRUD - Update operation for hotels

  async update({ chrId, chrData }: UpdateResponse): Promise<UpdateResponse> {
    try {
      const [chrResult] = await databaseClient.query<Result>(
        `UPDATE chr
         SET name = ?, address = ?, min_price = ?, max_price = ?
         WHERE id = ?`,
        [
          chrData.name,
          chrData.address,
          chrData.minPrice,
          chrData.maxPrice,
          chrId,
        ],
      );
      if (chrResult.affectedRows === 0) {
        throw new Error(`Aucune mise à jour effectué pour chrId ${chrId}`);
      }
      return { chrId, chrData };
    } catch (error) {
      throw new Error("Echec de la mise à jour");
    }
  }

  // The D of CRUD - Delete operation
  async delete(id: number): Promise<Result> {
    try {
      const [hotelResult] = await databaseClient.query<Result>(
        `DELETE hotel, chr 
         FROM hotel 
         LEFT JOIN chr ON hotel.chr_id = chr.id 
         WHERE hotel.id = ?`,
        [id],
      );

      if (hotelResult.affectedRows === 0) {
        throw new Error("Cet hôtel n'existe pas");
      }
      return hotelResult;
    } catch (error) {
      throw new Error("Erreur lors de la suppression");
    }
  }
}
export default new HotelsRepository();
