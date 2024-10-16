// import { Pool, QueryResult } from "pg";
import express, { Express } from "express";
import { buildSchema, GraphQLSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import environment from "./environment";

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

// const schema: GraphQLSchema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: "Query",
//     fields: {
//       hello: {
//         type: GraphQLString,
//         resolve() {
//           return "Hello world!";
//         },
//       },
//     },
//   }),
// });
const schema: GraphQLSchema = buildSchema(`
  type Query {
    hello: String
  }
`);
const root = {
  hello() {
    return "Hello world!";
  },
};

app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  }),
);

app.listen(port, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${port}/graphql`,
  );
});
