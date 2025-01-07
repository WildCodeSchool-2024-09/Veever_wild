import databaseClient from "../../../database/client";

import type { Result, Rows } from "../../../database/client";

type Admin = {
  id: number;
  user_id: number;
};

export type User = {
  id: number;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

class adminRepository {
  // The C of CRUD - Create operation
  async create(
    userData: Omit<User, "id">,
  ): Promise<{ profile: Omit<User & { adminId: number }, "password"> }> {
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

      if (!userId || userResult.affectedRows === 0) {
        throw new Error("Echec de création de l'utilisateur.");
      }

      const [adminResult] = await connection.query<Result>(
        `
        INSERT INTO admin (user_id)
        VALUES (?)
        `,
        [userId],
      );
      const adminId = adminResult.insertId;

      await connection.commit();

      return {
        profile: {
          email: userData.email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          id: userId,
          adminId: adminId,
        },
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // The Rs of CRUD - Read operations
  async read(id: number): Promise<Omit<User & Admin, "password"> | null> {
    // Execute the SQL SELECT query to retrieve a specific admin by its ID
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

    // Return the first row of the result, which represents the admin
    const admin = rows[0] as Omit<User & Admin, "password">;
    return admin;
  }

  async readAll(): Promise<Array<Omit<User & Admin, "password">> | null> {
    // Execute the SQL SELECT query to retrieve all admins from the "admin" table
    const [rows] = await databaseClient.query<Rows>(
      `
      SELECT admin.id, user.id as user_id, email, firstname, lastname
      FROM admin
      INNER JOIN user
      ON user.id = admin.user_id
      `,
    );

    if (rows.length === 0) {
      return null;
    }

    // Return the array of admins
    const admins = rows.map((admin) => {
      return admin as Omit<User & Admin, "password">;
    });

    return admins;
  }

  // The U of CRUD - Update operation
  async update(userData: User): Promise<{ profile: Omit<User, "password"> }> {
    const connection = await databaseClient.getConnection();

    try {
      const [userResult] = await connection.query<Result>(
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

      if (userResult.affectedRows === 0) {
        throw new Error(
          "Utilisateur non trouvé ou aucune modification effectuée.",
        );
      }

      return {
        profile: {
          email: userData.email,
          firstname: userData.firstname,
          lastname: userData.lastname,
          id: userData.id,
        },
      };
    } catch (error) {
      throw new Error(
        "Nous avons rencontré une erreur lors de la mise à jour de l'utilisateur.",
      );
    } finally {
      connection.release();
    }
  }

  // The D of CRUD - Delete operation
  async destroy(adminId: number): Promise<number> {
    const connection = await databaseClient.getConnection();

    try {
      const [result] = await connection.query<Result>(
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
    } finally {
      connection.release();
    }
  }
}

export default new adminRepository();
