import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class ChrRepository {
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
        chr.id, 
        CASE
          WHEN EXISTS (SELECT 1 FROM activity WHERE activity.chr_id = chr.id) THEN 'activities'
          WHEN EXISTS (SELECT 1 FROM hotel WHERE hotel.chr_id = chr.id) THEN 'hotels'
          WHEN EXISTS (SELECT 1 FROM restaurant WHERE restaurant.chr_id = chr.id) THEN 'restaurants'
        END AS type,
        chr.name, 
        chr.address, 
        chr.description, 
        chr.average_budget,
        CASE 
          WHEN a.duration IS NOT NULL THEN CONCAT('Durée : ', a.duration, ' heures')
          WHEN h.type IS NOT NULL THEN CONCAT('Type : ', h.type)
          WHEN r.type IS NOT NULL THEN CONCAT('Cuisine : ', r.type)
        END AS additional_info,
        i.link AS illustration_link
      FROM chr
      LEFT JOIN activity a ON chr.id = a.chr_id
      LEFT JOIN hotel h ON chr.id = h.chr_id
      LEFT JOIN restaurant r ON chr.id = r.chr_id
      LEFT JOIN illustration_chr ic ON chr.id = ic.chr_id
      LEFT JOIN illustration i ON ic.illustration_id = i.id
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
        CASE
          WHEN EXISTS (SELECT 1 FROM activity WHERE activity.chr_id = chr.id) THEN 'activities'
          WHEN EXISTS (SELECT 1 FROM hotel WHERE hotel.chr_id = chr.id) THEN 'hotels'
          WHEN EXISTS (SELECT 1 FROM restaurant WHERE restaurant.chr_id = chr.id) THEN 'restaurants'
          END AS type,
        chr.name, 
        chr.address, 
        chr.description, 
        chr.average_budget,
        CASE 
          WHEN a.duration IS NOT NULL THEN CONCAT('Durée : ', a.duration, ' heures')
          WHEN h.type IS NOT NULL THEN CONCAT('Type : ', h.type)
          WHEN r.type IS NOT NULL THEN CONCAT('Cuisine : ', r.type)
        END AS additional_info,
        i.link AS illustration_link
      FROM chr
      LEFT JOIN activity a ON chr.id = a.chr_id
      LEFT JOIN hotel h ON chr.id = h.chr_id
      LEFT JOIN restaurant r ON chr.id = r.chr_id
      LEFT JOIN illustration_chr ic ON chr.id = ic.chr_id
      LEFT JOIN illustration i ON ic.illustration_id = i.id
      `,
    );

    return rows;
  }
}

export default new ChrRepository();
