import { randomBytes } from "crypto";
import { Router } from "express";
import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";

const basicMutationssRouter = Router();

const schema = buildSchema(`
  input MessageInput {
    content: String
    author: String
  }
 
  type Message {
    id: ID!
    content: String
    author: String
  }
 
  type Query {
    getMessage(id: ID!): Message
  }
 
  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
    deleteMessage(id: ID!): Message
  }
`);

class Message {
  constructor(
    public id: string,
    public content: string,
    public author: string,
  ) {}
}

// Maps id to content
const fakeDatabase: Record<string, { content: string; author: string }> = {};

const root = {
  getMessage(args: { id: string }): Message {
    if (!fakeDatabase[args.id]) {
      throw new Error("no message exists with id " + args.id);
    }
    return new Message(
      args.id,
      fakeDatabase[args.id].content,
      fakeDatabase[args.id].author,
    );
  },
  // { "query": "mutation { createMessage(input: { content: \"test content\", author: \"test author\" }) { id } }" }
  createMessage(args: { input: { content: string; author: string } }): Message {
    const id: string = randomBytes(16).toString("hex");
    fakeDatabase[id] = args.input;
    return new Message(id, args.input.content, args.input.author);
  },
  updateMessage(args: {
    id: string;
    input: { content: string; author: string };
  }): Message {
    if (!fakeDatabase[args.id]) {
      throw new Error("no message exists with id " + args.id);
    }
    // Replace all data
    fakeDatabase[args.id] = args.input;
    return new Message(args.id, args.input.content, args.input.author);
  },
  deleteMessage(args: { id: string }): Message {
    if (!fakeDatabase[args.id]) {
      throw new Error("no message exists with id " + args.id);
    }

    const message: Message = new Message(
      args.id,
      fakeDatabase[args.id].content,
      fakeDatabase[args.id].author,
    );

    delete fakeDatabase[args.id];

    return message;
  },
};

basicMutationssRouter.all(
  "/",
  createHandler({
    schema: schema,
    rootValue: root,
  }),
);

export default basicMutationssRouter;
