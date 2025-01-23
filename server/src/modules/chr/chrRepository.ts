import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class ChrRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT name, address, description, average_budget
      FROM chr
      WHERE id = ?
      `,
      [id],
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT name, address, description, average_budget
      FROM chr
      `,
    );

    return rows;
  }
}

export default new ChrRepository();
