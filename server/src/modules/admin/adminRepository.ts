import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";
import type { Admin, User } from "../../types/admin/adminTypes";

class adminRepository {
  // The C of CRUD - Create operation
  async create(userData: Omit<User, "id">) {
    const connection = await databaseClient.getConnection();

    try {
      await connection.beginTransaction();

      const [userResult] = await connection.query<Result>(
        `
        INSERT INTO user (email, password, firstname, lastname)
        VALUES (?, ?, ?, ?)
        `,
        [
          userData.email,
          userData.password,
          userData.firstname,
          userData.lastname,
        ],
      );

      const userId = userResult.insertId;

      if (!userId) {
        await connection.rollback();
        throw new Error("Insertion échouée dans la table user");
      }

      const [adminResult] = await connection.query<Result>(
        `
        INSERT INTO admin (user_id)
        VALUES (?)
        `,
        [userId],
      );
      const adminId = adminResult.insertId;

      if (!adminId) {
        await connection.rollback();
        throw new Error("Insertion échouée dans la table admin");
      }

      await connection.commit();

      return adminId;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // The Rs of CRUD - Read operations
  async read(id: number) {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT admin.id, user.id as user_id, email, firstname, lastname
      FROM admin
      INNER JOIN user
      ON user.id = admin.user_id
      WHERE admin.id = ?
      `,
      [id],
    );

    if (rows.length === 0) {
      return null;
    }

    const admin = rows[0] as Omit<User & Admin, "password">;
    return admin;
  }

  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT admin.id, user.id as user_id, email, firstname, lastname
      FROM admin
      INNER JOIN user
      ON user.id = admin.user_id
      `,
    );

    return rows;
  }

  // The U of CRUD - Update operation
  async update(userData: User) {
    try {
      const [userResult] = await databaseClient.query<Result>(
        `
        UPDATE user
        SET email = ?, password = ?, firstname = ?, lastname = ?
        WHERE id = (SELECT user_id FROM admin WHERE id = ?)
        `,
        [
          userData.email,
          userData.password,
          userData.firstname,
          userData.lastname,
          userData.id,
        ],
      );

      return userResult.affectedRows;
    } catch (error) {
      throw new Error(
        "Nous avons rencontré une erreur lors de la mise à jour de l'utilisateur.",
      );
    }
  }

  // The D of CRUD - Delete operation
  async destroy(adminId: number): Promise<number> {
    try {
      const [result] = await databaseClient.query<Result>(
        `
        DELETE user, admin
        FROM user
        INNER JOIN admin
        ON admin.user_id = user.id
        WHERE admin.id = ?;
        `,
        [adminId],
      );

      if (result.affectedRows === 0) {
        throw new Error("Administrateur ou utilisateur non trouvé.");
      }

      return result.affectedRows;
    } catch (error) {
      throw new Error(
        "Nous avons rencontré une erreur lors de la suppression de l'utilisateur.",
      );
    }
  }
}

export default new adminRepository();
