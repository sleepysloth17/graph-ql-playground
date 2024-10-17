import { Router } from "express";
import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import commentRepository, { Comment } from "./comment-repository";
import userRepository from "./user-repository";

const chatRouter = Router();

const userType: GraphQLObjectType = new GraphQLObjectType({
  name: "User",
  fields: {
    id: { type: GraphQLID! },
    name: { type: GraphQLString! },
  },
});

const commentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: GraphQLID! },
    content: { type: GraphQLString! },
    author: {
      type: userType,
      args: {
        id: { type: GraphQLID! },
      },
      resolve: (parent: Comment) => {
        return userRepository.getUser(parent.authorId);
      },
    },
    children: {
      type: new GraphQLList(commentType),
      resolve: (parent: Comment) => {
        return commentRepository.getChildren(parent.id);
      },
    },
  }),
});

// foos(parent, args, context, info) {
const queryType: GraphQLObjectType = new GraphQLObjectType({
  name: "Query",
  fields: {
    getComments: {
      type: new GraphQLList(commentType),
      resolve: () => {
        return commentRepository.getComments();
      },
    },
    getComment: {
      type: new GraphQLList(commentType),
      args: { id: { type: GraphQLID! } },
      resolve: (_, args: { id: string }) => {
        return commentRepository.getComment(args.id);
      },
    },
  },
});

const schema: GraphQLSchema = new GraphQLSchema({ query: queryType });

chatRouter.all("/", createHandler({ schema }));

export default chatRouter;
