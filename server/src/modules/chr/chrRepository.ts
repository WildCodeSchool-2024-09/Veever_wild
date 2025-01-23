import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class ChrRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
        chr.id, 
        chr.name, 
        chr.address, 
        chr.description, 
        chr.average_budget,
        CASE 
          WHEN a.duration IS NOT NULL THEN CONCAT('Durée : ', a.duration, ' heures')
          WHEN h.type IS NOT NULL THEN CONCAT('Type : ', h.type)
          WHEN r.type IS NOT NULL THEN CONCAT('Cuisine : ', r.type)
        END AS additional_info
      FROM chr
      LEFT JOIN activity a ON chr.id = a.chr_id
      LEFT JOIN hotel h ON chr.id = h.chr_id
      LEFT JOIN restaurant r ON chr.id = r.chr_id
      WHERE chr.id = ?
      `,
      [id],
    );

    return rows[0];
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
        SELECT 
          chr.id, 
          chr.name, 
          chr.address, 
          chr.description, 
          chr.average_budget,
          CASE 
            WHEN a.duration IS NOT NULL THEN CONCAT('Durée : ', a.duration, ' heures')
            WHEN h.type IS NOT NULL THEN CONCAT('Type : ', h.type)
            WHEN r.type IS NOT NULL THEN CONCAT('Cuisine : ', r.type)
          END AS additional_info
        FROM chr
        LEFT JOIN activity a ON chr.id = a.chr_id
        LEFT JOIN hotel h ON chr.id = h.chr_id
        LEFT JOIN restaurant r ON chr.id = r.chr_id
      `,
    );

    return rows;
  }
}

export default new ChrRepository();
