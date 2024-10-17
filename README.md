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

https://www.apollographql.com/docs/react/data/operation-best-practices

Is tehre a way, for example, to get what fields are being queried? e.g, if I want to get, say, a director and his films vs a director and _not_ his films, it doesn't make sense ot query the db for th efilms in teh second case, but it does't make sense to have multiple endpointsd
https://www.reddit.com/r/graphql/comments/rffr95/i_dont_understand_how_graphql_can_be_performant/
https://www.apollographql.com/docs/apollo-server/data/resolvers
https://stackoverflow.com/questions/58976947/graphql-in-nodejs-resolver-for-object-types
