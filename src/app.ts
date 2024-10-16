// import { Pool, QueryResult } from "pg";
import express, { Express } from "express";
import basicMutationssRouter from "./basic-mutations/basic-mutations-router";
import basicTypesRouter from "./basic-types/basic-types-router";
import environment from "./environment";
import helloWorldRouter from "./hello-world/hello-world-router";
import rollDiceObjectRouter from "./roll-dice-object/roll-dice-object-router";
import rollDiceRouter from "./roll-dice/roll-dice-router";

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
app.use("/basic-types", basicTypesRouter);
app.use("/roll-dice", rollDiceRouter);
app.use("/roll-dice-object", rollDiceObjectRouter);
app.use("/basic-mutations", basicMutationssRouter);

app.listen(port, () => {
  console.log(`Running a GraphQL API server at http://localhost:${port}`);
});
