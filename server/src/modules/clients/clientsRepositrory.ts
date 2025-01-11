import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Client = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  
  birthdate: Date;
  nickName: string;
  phoneNumber: number;
  gender_Id: number;
  user_id: number;
};

class ClientRepository {
  async update(updateClient: Omit<Client, "user_id">): Promise<boolean> {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT user_id FROM client
      WHERE id = ?
      `,
      [updateClient.id],
    );

    if (rows.length === 0) {
      return false;
    }

    const [result] = await databaseClient.query<Result>(
      `
    UPDATE clients
    SET birthdate = ?, nickname = ?, gender_id = ?
    WHERE id = ?
    `,
      [
        updateClient.birthdate,
        updateClient.nickName,
        updateClient.gender_Id,
        updateClient.id,
      ],
    );

    return result.affectedRows > 0;
  }

  async create(client: Omit<Client, "id">): Promise<number> {
    // Execute the SQL INSERT query to add a new client to the "client" table
        const connection = await databaseClient.getConnection();
    try {
      await connection.beginTransaction();
      
    const [result] = await databaseClient.query<Result>(
      `
        INSERT INTO users
            (email, password, firstname, lastname)
        VALUES (?, ?, ?, ?)
        `,
        [client.email, client.password, client.firstname, client.lastname],
    );

    const userId = result.insertId;

    const [clientResult] = await connection.query<Result>(
            `
        INSERT INTO clients
            (birthdate, nickname, gender_id, user_id)
        VALUES (?, ?, ?, ?)
        `,
      [client.birthdate, client.nickName, client.gender_Id, userId],
    );

    const clientId = clientResult.insertId;

    await connection.query<Result>(
      `
      INSERT INTO phones (client_id, phone_number)
      VALUES (?, ?)
      `,
      [clientId, client.phoneNumber],
    );

    await connection.commit();
    return clientId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // The Rs of CRUD - Read operations

  async read(id: number) {
    // Execute the SQL SELECT query to retrieve a specific client by its ID
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT * FROM client 
      WHERE id = ?
      `,
      [id],
    );

    // Return the first row of the result, which represents the client
    return rows[0] as Client;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "client" table
    const [rows] = await databaseClient.query<Rows>("SELECT * FROM client");

    // Return the array of items
    return rows as Client[];
  }

  // The D of CRUD - Delete operation
  async destroy(id: number): Promise<boolean> {
    const [result] = await databaseClient.query<Result>(
      `
      DELETE FROM clients
      WHERE id = ?
      `,
      [id],
    );
    return result.affectedRows > 0;
  }
}

export default new ClientRepository();
