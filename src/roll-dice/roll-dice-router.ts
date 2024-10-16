import { Router } from "express";
import { buildSchema, GraphQLSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";

const rollDiceRouter = Router();

// thing! means not null, otherwise it's nullable by default
// So it returns an error to the user if, for example, numDice is null
const schema: GraphQLSchema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);
const root = {
  // type hints to remind me
  rollDice(args: { numDice: number; numSides?: number }) {
    return new Array(args.numDice)
      .fill(null)
      .map(() => 1 + Math.floor(Math.random() * (args.numSides || 6)));
  },
};

// So can call this, for example, with a body of {"query": "{ rollDice(numDice: 4, numSides: 6) }"}
// or, {"query":"query RollDice($dice: Int!, $sides: Int) { rollDice(numDice: $dice, numSides: $sides) }","variables":{"dice":3,"sides":6}}
rollDiceRouter.all(
  "/",
  createHandler({
    schema: schema,
    rootValue: root,
  }),
);

export default rollDiceRouter;
