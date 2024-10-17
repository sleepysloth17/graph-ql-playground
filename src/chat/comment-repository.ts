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

  private static readonly DEFAULT_PARENT_ID: string =
    "00000000-0000-0000-0000-000000000000";

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

  public getCommentChildren(parentId: string): Promise<Comment[]> {
    return this._pool
      .query(
        `SELECT * FROM ${CommentRepository.TABLE_NAME} WHERE parent_id = $1 ORDER BY created_at ASC`,
        [parentId],
      )
      .then((res: QueryResult<unknown>) => {
        return res.rows.map((row: unknown) => this._parseComment(row));
      });
  }

  public createComment(
    authorId: string,
    content: string,
    parentId: string,
  ): Promise<Comment> {
    return this._pool
      .query(
        `INSERT INTO ${CommentRepository.TABLE_NAME} (parent_id, author_id, content) 
      VALUES ($1, $2, $3) RETURNING *`,
        [parentId || CommentRepository.DEFAULT_PARENT_ID, authorId, content],
      )
      .then((res: QueryResult<unknown>) => {
        console.log(res);
        if (res.rowCount) {
          return this._parseComment(res.rows[0]);
        }

        return null;
      });
  }

  public deleteComment(id: string): Promise<Comment> {
    return this._pool
      .query(
        `DELETE FROM ${CommentRepository.TABLE_NAME} WHERE id = $1 RETURNING *`,
        [id],
      )
      .then((res: QueryResult<unknown>) => {
        if (res.rowCount) {
          return this._parseComment(res.rows[0]);
        }

        return null;
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
