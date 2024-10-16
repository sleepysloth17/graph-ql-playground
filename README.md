# GraphQL Playground

Project using express.js, graphql, postgres to mess around with graphql

## DB Migration

Docs are [here](https://salsita.github.io/node-pg-migrate).

Standard ones I'll be using:

- To create: `npm run migrate create <migration name>`
- To run: `npm run migrate up <migration name>`

## Notes

Okay, so can _roughly_ think about it as:

- the schema is like a API definintion doc
  - Query is how you can talk to the server: what you can ask for
  - Mutation si what you can change
- the resolvers then tie the actual code and model etc to the schema
