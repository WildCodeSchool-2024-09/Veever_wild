import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { ClientKeyword } from "../../types/keyword/keywordTypes";

class ClientKeywordRepository {
  // Create operation
  async create(clientKeywordData: Omit<ClientKeyword, "id">) {
    try {
      const [clientKeywordResult] = await databaseClient.execute<Result>(
        `INSERT INTO client_keyword 
         (client_id, keyword_id) 
         VALUES (?, ?)`,
        [clientKeywordData.client_id, clientKeywordData.keyword_id],
      );

      const clientKeywordId = clientKeywordResult.insertId;
      if (!clientKeywordId) {
        throw new Error("Insertion échouée dans la table clientKeyword");
      }

      return clientKeywordId;
    } catch (error) {
      throw new Error(`Erreur lors de l'insertion du clientKeyword, ${error}`);
    }
  }

  // Read operations
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT client_keyword.id, client_keyword.client_id, client_keyword.keyword_id
       FROM client_keyword`,
    );

    return rows;
  }

  async read(clientKeywordId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT client_keyword.id, client_keyword.client_id, client_keyword.keyword_id
       FROM client_keyword
       WHERE client_keyword.id = ?`,
      [clientKeywordId],
    );

    return rows[0];
  }

  // Update operation
  async update(clientKeywordData: ClientKeyword) {
    const [clientKeywordResult] = await databaseClient.execute<Result>(
      `UPDATE client_keyword 
       SET client_id = ?, keyword_id = ? 
       WHERE id = ?`,
      [
        clientKeywordData.client_id,
        clientKeywordData.keyword_id,
        clientKeywordData.id,
      ],
    );

    if (clientKeywordResult.affectedRows === 0) {
      throw new Error(
        "Aucune modification n'a été effectuée : clientKeyword non mis à jour",
      );
    }

    return clientKeywordResult.affectedRows > 0;
  }

  // Delete operation
  async destroy(clientKeywordId: number) {
    const [result] = await databaseClient.execute<Result>(
      `DELETE FROM client_keyword 
       WHERE client_keyword.id = ?`,
      [clientKeywordId],
    );

    return result.affectedRows > 0;
  }
}

export default new ClientKeywordRepository();
