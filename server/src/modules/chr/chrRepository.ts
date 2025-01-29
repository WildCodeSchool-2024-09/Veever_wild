import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

type Image = {
  link: string;
};

class ChrRepository {
  async read(id: number) {
    const [chrRows] = await databaseClient.query<Rows>(
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
          WHEN MAX(restaurant.type) IS NOT NULL THEN CONCAT('Cuisine : ', MAX(restaurant.type))
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
      WHERE chr.id = 1
      GROUP BY chr.id, chr.name, chr.address, chr.description, chr.average_budget;
      `,
      [id],
    );

    return chrRows;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT 
          chr.id, 
          CASE
              WHEN a.duration IS NOT NULL THEN 'activity'
              WHEN h.type IS NOT NULL THEN 'hotel'
              WHEN r.type IS NOT NULL THEN 'restaurant'
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
          COALESCE(
              JSON_ARRAYAGG(i.link), 
              JSON_ARRAY()
          ) AS images
      FROM chr
      LEFT JOIN activity a ON chr.id = a.chr_id
      LEFT JOIN hotel h ON chr.id = h.chr_id
      LEFT JOIN restaurant r ON chr.id = r.chr_id
      LEFT JOIN illustration_chr ic ON chr.id = ic.chr_id
      LEFT JOIN illustration i ON ic.illustration_id = i.id
      GROUP BY chr.id, a.duration, h.type, r.type
      `,
    );

    return rows;
  }
}

export default new ChrRepository();
