import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Activities = {
  id: number;
  chr_id: number;
};

class ActivityRepository {
  // The C of CRUD - Create operation

  async create(activity: Omit<Activities, "id">) {
    // Execute the SQL INSERT query to add a new activity to the "activity" table
    const [result] = await databaseClient.query<Result>(
      `INSERT 
       INTO activity 
      (chr_id) values (?)`,
      [activity.chr_id],
    );

    // Return the ID of the newly inserted activity
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific activity by its ID
    const [rows] = await databaseClient.query<Rows>(
      `SELECT *
       FROM actitivy 
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
