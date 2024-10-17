import express, { Express } from "express";
import basicMutationssRouter from "./basic-mutations/basic-mutations-router";
import basicTypesRouter from "./basic-types/basic-types-router";
import chatRouter from "./chat/chat-router";
import environment from "./environment";
import helloWorldRouter from "./hello-world/hello-world-router";
import rollDiceObjectRouter from "./roll-dice-object/roll-dice-object-router";
import rollDiceRouter from "./roll-dice/roll-dice-router";

const port: number = environment.SERVER_PORT;
const app: Express = express();

// https://graphql.org/learn/best-practices/#http, but here I've done seperate just so it's easier for me to  read each bit
app.use("/hello-world", helloWorldRouter);
app.use("/basic-types", basicTypesRouter);
app.use("/roll-dice", rollDiceRouter);
app.use("/roll-dice-object", rollDiceObjectRouter);
app.use("/basic-mutations", basicMutationssRouter);
app.use("/chat", chatRouter);

app.listen(port, () => {
  console.log(`Running a GraphQL API server at http://localhost:${port}`);
});
