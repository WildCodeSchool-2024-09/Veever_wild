import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type chrData = {
  name: string;
  address: string;
  min_price: number;
  max_price: number;
};

class ActivityRepository {
  // The C of CRUD - Create operation

  async create(chrData: chrData) {
    const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();
      // Execute the SQL INSERT query to add a new activity to the "activity" table
      const [chrResult] = await connection.query<Result>(
        `INSERT 
        INTO chr 
        (name, address, min_price, max_price) values (?, ?, ?, ?)`,
        [chrData.name, chrData.address, chrData.min_price, chrData.max_price],
      );
      if (!chrResult || !chrResult.insertId) {
        await connection.rollback();
        throw new Error("Insertion chr échoué");
      }
      // Return the ID of the newly inserted activity
      const chrId = chrResult.insertId;
      const [activityResult] = await connection.query<Result>(
        `INSERT
        INTO activity
        (chr_id) values (?)`,
        [chrId],
      );
      if (!activityResult || !activityResult.insertId) {
        await connection.rollback();
        throw new Error("Insertion activité échoué");
      }
      await connection.commit();
      return activityResult.insertId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific activity by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT chr.name AS name, chr.address AS address, chr.min_price AS minPrice, chr.max_price AS maxPrice,
       FROM actitivy 
       INNER JOIN chr
       ON activity.chr_id = chr.id
       where id = ?`,
      [id],
    );

    // Return the first row of the result, which represents the activity
    return rows[0] as Activities;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all activities from the "activity" table
    const [rows] = await databaseClient.query<Rows>(
      `SELECT *
       FROM activity`,
    );

    // Return the array of activities
    return rows as Activities[];
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing activity

  async update(id: number, editActivities: Partial<Omit<Activities, "id">>) {
    const [rows] = await databaseClient.query<Rows>(
      `UPDATE activity
       SET chr_id = ?
       WHERE id = ?`,
      [editActivities.chr_id, id],
    );
    return rows as Activities[];
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an activity by its ID

  async delete(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `DELETE 
      FROM hotel
      WHERE id = ?`,
      [id],
    );
    return rows as Activities[];
  }
}

export default new ActivityRepository();
