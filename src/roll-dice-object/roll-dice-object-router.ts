import { Router } from "express";
import { buildSchema, GraphQLSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";

const rollDiceObjectRouter = Router();

class RandomDie {
  constructor(private _numSides: number) {}

  public rollOnce(): number {
    return 1 + Math.floor(Math.random() * this._numSides);
  }

  public roll(args: { numRolls: number }) {
    return new Array(args.numRolls).fill(null).map(() => this.rollOnce());
  }
}

// thing! means not null, otherwise it's nullable by default
// So it returns an error to the user if, for example, numDice is null
const schema: GraphQLSchema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    getDie(numSides: Int): RandomDie
  }
`);
const root = {
  // type hints to remind me
  getDie(args: { numSides?: number }) {
    return new RandomDie(args.numSides || 6);
  },
};

// So can call this, for example, with a body of { "query": "{ getDie(numSides: 6) { rollOnce, roll(numRolls: 3) } }" }
// or, {"query":"query RollSomeDice($dice: Int!, $sides: Int) { getDie(numSides: $sides) { rollOnce, roll(numRolls: $dice) } }","variables":{"dice":3,"sides":6}}
rollDiceObjectRouter.all(
  "/",
  createHandler({
    schema: schema,
    rootValue: root,
  }),
);

export default rollDiceObjectRouter;
