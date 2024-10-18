import { Router } from "express";
import { buildSchema, GraphQLSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";

const helloWorldRouter = Router();

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

helloWorldRouter.all(
  "/",
  createHandler({
    schema: schema,
    rootValue: root,
  }),
);

export default helloWorldRouter;
