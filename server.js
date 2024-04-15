const { ApolloServer } = require("apollo-server");
const gqwl = require("graphql-tag");

//this is a schema definition language (SDL) that allows you to define the shape of your data graph in a simple, human-readable way. It's similar to JSON, but with some extra features that make it easier to define the shape of your data.
const typeDefs = gqwl`
    type User {
        id: ID!
        username: String!
        createdAt: Int!
    }

    type Settings {
        user: User!
        theme: String!
    }

    input NewSettingsInput {
        user: ID!
        theme: String!
    }

    type Query {
        me: User!
        settings(user: ID!): Settings!
    }

    type Mutation {
        settings(input: NewSettingsInput!): Settings!
    }
`;

// This is aresolver is a function that's responsible for fetching the data for a single field in your schema. Resolvers are where you define how to fetch the data for a particular field, whether it's from a database, another API, or a complex calculation.
const resolvers = {
  Query: {
    me() {
      return {
        id: 1,
        username: "Luke Skywalker",
        createdAt: 1511354160519,
      };
    },
    settings(_, { user }) {
      return {
        user,
        theme: "Light",
      };
    },
  },

  Mutation: {
    settings(_, { input }) {
      return input;
    },
  },

  Settings: {
    user() {
      return {
        id: 1,
        username: "Luke Skywalker",
        createdAt: 1511354160519,
      };
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => console.log(`Server at ${url}`));
