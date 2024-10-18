import { Router } from "express";
import basicMutationssRouter from "./basic-mutations/basic-mutations-router";
import basicTypesRouter from "./basic-types/basic-types-router";
import helloWorldRouter from "./hello-world/hello-world-router";
import rollDiceObjectRouter from "./roll-dice-object/roll-dice-object-router";
import rollDiceRouter from "./roll-dice/roll-dice-router";

const tutorialRouter = Router();

tutorialRouter.use("/hello-world", helloWorldRouter);
tutorialRouter.use("/basic-types", basicTypesRouter);
tutorialRouter.use("/roll-dice", rollDiceRouter);
tutorialRouter.use("/roll-dice-object", rollDiceObjectRouter);
tutorialRouter.use("/basic-mutations", basicMutationssRouter);

export default tutorialRouter;
