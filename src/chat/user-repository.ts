import { Pool, QueryResult } from "pg";
import pool from "./pool";

export class User {
  constructor(
    public id: string,
    public name: string,
  ) {}
}

class UserRepository {
  private static readonly TABLE_NAME: string = "users";

  constructor(private _pool: Pool) {}

  public getUser(id: string): Promise<User> {
    return this._pool
      .query(`SELECT * FROM ${UserRepository.TABLE_NAME} WHERE id = $1`, [id])
      .then((res: QueryResult<unknown>) => {
        if (res.rowCount) {
          return this._parseUser(res.rows[0]);
        }

        return null;
      });
  }

  public createUser(name: string): Promise<User> {
    return this._pool
      .query(
        `INSERT INTO ${UserRepository.TABLE_NAME} (id, name) VALUES (uuid_generate_v4(), $1) RETURNING *`,
        [name],
      )
      .then((res: QueryResult<unknown>) => {
        if (res.rowCount) {
          return this._parseUser(res.rows[0]);
        }

        return null;
      });
  }

  public deleteUser(id: string): Promise<User> {
    return this._pool
      .query(
        `DELETE FROM ${UserRepository.TABLE_NAME} WHERE id = $1 RETURNING *`,
        [id],
      )
      .then((res: QueryResult<unknown>) => {
        if (res.rowCount) {
          return this._parseUser(res.rows[0]);
        }

        return null;
      });
  }

  private _parseUser(row: unknown): User {
    return new User(row["id"], row["name"]);
  }
}

export default new UserRepository(pool);
