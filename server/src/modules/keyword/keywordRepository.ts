import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Illustration, Keyword } from "../../types/keyword/keywordTypes";

class keywordRepository {
  // The C of CRUD - Create operation
  // Quand on crée un mot clé, on le rattache à une illustration
  async create(keywordData: Omit<Keyword & Illustration, "id">) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();
      const [keywordResult] = await connection.query<Result>(
        `
        INSERT INTO keyword
        (name)
        VALUES
        (?)
        `,
        [keywordData.name],
      );
      const keywordId = keywordResult.insertId;

      if (!keywordId) {
        throw new Error("Insertion échouée dans la table keyword");
      }

      const [illustrationResult] = await connection.query<Result>(
        `
        INSERT INTO illustration
        (link)
        VALUES
        (?)
        `,
        [keywordData.link],
      );
      const illustrationId = illustrationResult.insertId;

      if (!illustrationId) {
        throw new Error("Insertion échouée dans la table illustration");
      }

      const [keywordIllustration] = await connection.query<Result>(
        `
        INSERT INTO illustration_keyword
        (keyword_id, illustration_id)
        VALUES
        (?, ?)`,
        [keywordId, illustrationId],
      );

      const keywordIllustrationId = keywordIllustration.insertId;

      if (!keywordIllustrationId) {
        throw new Error("Insertion échouée dans la table illustration_keyword");
      }

      await connection.commit();

      return keywordId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  // The Rs of CRUD - Read operations
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT keyword.id, keyword.name, illu.link
      FROM illustration_keyword as ilKey
      INNER JOIN keyword
      ON keyword.id = ilKey.keyword_id
      INNER JOIN illustration illu
      ON illu.id = ilKey.illustration_id
      `,
    );

    if (rows.length === 0) {
      return null;
    }

    const keywords = rows.map((keyword) => {
      return keyword as Keyword & Illustration;
    });

    return keywords;
  }

  async read(keywordId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT keyword.id, keyword.name, illu.link
      FROM illustration_keyword as ilKey
      INNER JOIN keyword
      ON keyword.id = ilKey.keyword_id
      INNER JOIN illustration illu
      ON illu.id = ilKey.illustration_id
      WHERE keyword.id = ?
      `,
      [keywordId],
    );

    if (rows.length === 0) {
      return null;
    }

    const keyword = rows[0] as Keyword & Illustration;

    return keyword;
  }
  // The U of CRUD - Update operations
  async update(keywordData: Keyword & Illustration) {
    const connection = await databaseClient.getConnection();
    try {
      connection.beginTransaction();

      const [keywordResult] = await connection.query<Result>(
        `
        UPDATE keyword
        SET name = ?
        WHERE id = ?
        `,
        [keywordData.name, keywordData.id],
      );

      if (keywordResult.affectedRows === 0) {
        throw new Error(
          "Nous avons rencontré une erreur lors de la mise à jour du mot-clé.",
        );
      }

      const [illustrationResult] = await connection.query<Result>(
        `
        UPDATE illustration
        SET link = ?
        WHERE id = (
          SELECT illustration_id
          FROM illustration_keyword
          WHERE keyword_id = ?
        )
        `,
        [keywordData.link, keywordData.id],
      );

      if (illustrationResult.affectedRows === 0) {
        throw new Error(
          "Nous avons rencontré une erreur lors de la mise à jour de l'illustration.",
        );
      }

      await connection.commit();

      return true;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
  // The D of CRUD - Delete operation
  async destroy(keywordId: number) {
    try {
      const [result] = await databaseClient.query<Result>(
        `
        DELETE keyword, illustration, illustration_keyword
        FROM illustration_keyword
        INNER JOIN illustration
        ON illustration.id = illustration_keyword.illustration_id
        INNER JOIN keyword
        ON keyword.id = illustration_keyword.keyword_id
        WHERE keyword.id = ?
        `,
        [keywordId],
      );

      if (result.affectedRows === 0) {
        throw new Error("Keyword ou Illustration non trouvé");
      }

      return result.affectedRows;
    } catch (error) {
      throw new Error(
        "Nous avons rencontré une erreur lors de la suppression du mot-clé.",
      );
    }
  }
}

export default new keywordRepository();
