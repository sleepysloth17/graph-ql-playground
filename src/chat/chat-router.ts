import { Router } from "express";
import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
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
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const commentType = new GraphQLObjectType({
  name: "Comment",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    content: { type: new GraphQLNonNull(GraphQLString) },
    author: {
      type: userType,
      resolve: (parent: Comment) => {
        return userRepository.getUser(parent.authorId);
      },
    },
    children: {
      type: new GraphQLList(commentType),
      resolve: (parent: Comment) => {
        return commentRepository.getCommentChildren(parent.id);
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
      type: commentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, args: { id: string }) => {
        return commentRepository.getComment(args.id);
      },
    },
    getUser: {
      type: userType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, args: { id: string }) => {
        return userRepository.getUser(args.id);
      },
    },
  },
});

const mutationType: GraphQLObjectType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createUser: {
      type: userType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: (_, args: { name: string }) => {
        return userRepository.createUser(args.name);
      },
    },
    deleteUser: {
      type: userType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, args: { id: string }) => {
        return userRepository.deleteUser(args.id);
      },
    },
    createComment: {
      type: commentType,
      args: {
        authorId: { type: new GraphQLNonNull(GraphQLID) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        parentId: { type: GraphQLID },
      },
      resolve: (
        _,
        args: { authorId: string; content: string; parentId: string },
      ) => {
        return commentRepository.createComment(
          args.authorId,
          args.content,
          args.parentId,
        );
      },
    },
    deleteComment: {
      type: commentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (_, args: { id: string }) => {
        return commentRepository.deleteComment(args.id);
      },
    },
  },
});

const schema: GraphQLSchema = new GraphQLSchema({
  query: queryType,
  mutation: mutationType,
});

chatRouter.all("/", createHandler({ schema }));

export default chatRouter;
