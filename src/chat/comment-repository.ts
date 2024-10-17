import { Pool, QueryResult } from "pg";
import pool from "./pool";

export class Comment {
  constructor(
    public id: string,
    public authorId: string,
    public createdAt: number,
    public content: string,
    public parentId: string,
  ) {}
}

class CommentRepository {
  private static readonly TABLE_NAME: string = "comment";

  constructor(private _pool: Pool) {
    console.log("initialised comment repository");
  }

  public getComments(): Promise<Comment[]> {
    return this._pool
      .query(
        `SELECT * FROM ${CommentRepository.TABLE_NAME} ORDER BY created_at ASC`,
      )
      .then((res: QueryResult<unknown>) => {
        return res.rows.map((row: unknown) => this._parseComment(row));
      });
  }

  public getComment(id: string): Promise<Comment> {
    return this._pool
      .query(`SELECT * FROM ${CommentRepository.TABLE_NAME} WHERE id = $1`, [
        id,
      ])
      .then((res: QueryResult<unknown>) => {
        if (res.rowCount) {
          return this._parseComment(res.rows[0]);
        }

        return null;
      });
  }

  public getChildren(parentId: string): Promise<Comment[]> {
    return this._pool
      .query(
        `SELECT * FROM ${CommentRepository.TABLE_NAME} WHERE parent_id = $1 ORDER BY created_at ASC`,
        [parentId],
      )
      .then((res: QueryResult<unknown>) => {
        return res.rows.map((row: unknown) => this._parseComment(row));
      });
  }

  private _parseComment(row: unknown): Comment {
    return new Comment(
      row["id"],
      row["author_id"],
      +row["created_at"],
      row["content"],
      row["parent_id"],
    );
  }
}

export default new CommentRepository(pool);
