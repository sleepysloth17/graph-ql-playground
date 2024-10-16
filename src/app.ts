import { Pool, PoolClient, QueryResult } from "pg";
import environment from "./environment";

const pool: Pool = new Pool({
  user: environment.PGUSER,
  password: environment.PGPASSWORD,
  host: environment.PGHOST,
  port: +environment.PGPORT,
  database: environment.PGDATABASE,
});

console.log(`Hello World!`);

pool.connect().then((client: PoolClient) =>
  client
    .query("SELECT * FROM books")
    .then((res: QueryResult<unknown>) => {
      console.log(res.rows);
      client.release();
      return res;
    })
    .then(() => pool.end()),
);
