import { Router } from "express";
import { buildSchema, GraphQLSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";

const basicTypesRouter = Router();

const schema: GraphQLSchema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
  }
`);
const root = {
  quoteOfTheDay(): string {
    return "Some random quote, so exciting (spoiler, it is the same every time)";
  },
  random(): number {
    return Math.random();
  },
};

basicTypesRouter.all(
  "/",
  createHandler({
    schema: schema,
    rootValue: root,
  }),
);

export default basicTypesRouter;
