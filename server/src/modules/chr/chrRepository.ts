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
        chr.name,
        chr.address,
        chr.description,
        chr.average_budget,
        CASE
        WHEN MAX(activity.duration) IS NOT NULL THEN 'activity'
          WHEN MAX(hotel.type) IS NOT NULL THEN 'hotel'
          WHEN MAX(restaurant.type) IS NOT NULL THEN 'restaurant'
        END AS type,
        CASE 
          WHEN MAX(activity.duration) IS NOT NULL THEN CONCAT('Durée : ', MAX(activity.duration), ' heures')
          WHEN MAX(hotel.type) IS NOT NULL THEN CONCAT('Type : ', MAX(hotel.type))
          WHEN MAX(restaurant.type) IS NOT NULL THEN CONCAT(MAX(restaurant.type))
        END AS additional_info,
        COALESCE(
          JSON_ARRAYAGG(
            JSON_OBJECT('id', illustration.id, 'link', illustration.link)
          ),
          JSON_ARRAY()
        ) AS images
      FROM chr
      INNER JOIN illustration_chr ON chr.id = illustration_chr.chr_id
      INNER JOIN illustration ON illustration_chr.illustration_id = illustration.id
      LEFT JOIN activity ON activity.chr_id = chr.id
      LEFT JOIN hotel ON hotel.chr_id = chr.id
      LEFT JOIN restaurant ON restaurant.chr_id = chr.id
      GROUP BY chr.id, chr.name, chr.address, chr.description, chr.average_budget;
      `,
    );

    return rows;
  }
}

export default new ChrRepository();
