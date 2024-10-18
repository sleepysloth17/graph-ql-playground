import express, { Express } from "express";
import chatRouter from "./chat/chat-router";
import environment from "./environment";
import tutorialRouter from "./tutorial/tutorial-router";

const port: number = environment.SERVER_PORT;
const app: Express = express();

// https://graphql.org/learn/best-practices/#http, but here I've done seperate just so it's easier for me to  read each bit
app.use("/tutorial", tutorialRouter);
app.use("/chat", chatRouter);

app.listen(port, () => {
  console.log(`Running a GraphQL API server at http://localhost:${port}`);
});
