// import { Pool, QueryResult } from "pg";
import express, { Express } from "express";
import environment from "./environment";
import helloWorldRouter from "./hello-world/hello-world-router";

// const pool: Pool = new Pool({
//   user: environment.PGUSER,
//   password: environment.PGPASSWORD,
//   host: environment.PGHOST,
//   port: environment.PGPORT,
//   database: environment.PGDATABASE,
// });

// pool
//   .query("SELECT * FROM books")
//   .then((res: QueryResult<unknown>) => console.log(res.rows));

const port: number = environment.SERVER_PORT;
const app: Express = express();

app.use("/hello-world", helloWorldRouter);

app.listen(port, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`,
  );
});
