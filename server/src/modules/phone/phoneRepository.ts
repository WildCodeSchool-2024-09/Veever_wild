import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class PhoneRepository {
  async create(clientId: number, phoneNumber: string): Promise<number> {
    const [phoneResult] = await databaseClient.query<Result>(
      `
        INSERT INTO phone (client_id, phone_number)
        VALUES (?, ?)
        `,
      [clientId, phoneNumber],
    );
    return phoneResult.insertId;
  }
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
            SELECT phone_number FROM phone
            WHERE client_id = ?
            `,
      [id],
    );
    return rows[0];
  }
}

export default new PhoneRepository();

// si le client n'a pas de numéro de téléphone dans ces cas la le middlewere appelera la méthode create et fera l'insertion normal
// si le client a un numéro de téléphone dans ces cas la le middlewere appelera la méthode update et fera la mise à jour du numéro de téléphone
// si le client n'a pas de numéro de téléphone dans ces cas la le middlewere appelera la méthode delete et fera la suppression du numéro de téléphone
//
// si le client n'a pas de numéro de téléphone, le middleware appellera la méthode create et fera l'insertion normalement
// si le client a un numéro de téléphone, le middleware appellera la méthode update et fera la mise à jour du numéro de téléphone
// si le client souhaite supprimer son numéro de téléphone, le middleware appellera la méthode delete et fera la suppression du numéro de téléphone
