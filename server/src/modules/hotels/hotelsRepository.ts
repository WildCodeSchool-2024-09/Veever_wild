import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Hotels = {
  id: number;
  chr_id: number;
};
type ChrData = {
  name: string;
  address: string;
  minPrice: number;
  maxPrice: number;
};
type UpdateResponse = {
  chrId: number;
  chrData: ChrData;
};
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

      if (!hotelResult || hotelResult.insertId) {
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
      `SELECT chr.adress, chr.min_price, chr.max_price, chr.name
       FROM hotel 
       INNER JOIN chr
       ON hotel.chr_id = chr_id
       WHERE hotel.id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the hotel
    return rows[0] as Hotels;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all hotels from the "hotel" table
    const [rows] = await databaseClient.query<Rows>(
      `SELECT chr.adress, chr.min_price, chr.max_price, chr.name
       FROM hotel
       INNER JOIN chr
       ON hotel.chr_id = chr_id`,
    );

    // Return the array of hotels
    return rows as Hotels[];
  }

  // The U of CRUD - Update operation for hotels

  async update(
    hotelId: number,
    chrId: number,
    chrData: ChrData,
  ): Promise<UpdateResponse> {
    const connection = await databaseClient.getConnection();

    try {
      await connection.query(
        `UPDATE chr
         SET name = ?, address = ?, minPrice = ?, maxPrice = ?
         WHERE id = ?`,
        [
          chrData.name,
          chrData.address,
          chrData.minPrice,
          chrData.maxPrice,
          chrId,
        ],
      );

      return { chrId, chrData };
    } catch (error) {
      console.error("Erreur lors de la transaction: ", error);
      throw error;
    } finally {
      connection.release();
    }
  }

  // The D of CRUD - Delete operation
  async delete(id: number): Promise<Result> {
    const connection = await databaseClient.getConnection();
    try {
      const [hotelResult] = await connection.query<Result>(
        `DELETE hotel, chr 
         FROM hotel 
         LEFT JOIN chr ON hotel.chr_id = chr.id 
         WHERE hotel.id = ?`,
        [id],
      );

      if (hotelResult.affectedRows !== 1) {
      }
      return hotelResult;
    } catch (error) {
      throw new Error("Erreur lors de la suppression");
    } finally {
      connection.release();
    }
  }
}
export default new HotelsRepository();
