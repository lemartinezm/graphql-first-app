import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeDefs = `#graphql
  type Address {
    street: String!
    city: String!
    country: String!
    zip: String
    state: String!
  }

  type Person {
    name: String!
    age: Int!
    gender: String!
    address: Address!
  }

  type Query {
    getAllPersons: [Person]
    getAddressByPersonName(name: String!): String!
  }
`;

const persons = [
  {
    name: "John",
    age: 30,
    gender: "male",
    address: {
      street: "123 Main St",
      city: "New York",
      country: "USA",
      state: "NY",
      zip: "10001",
    },
  },
  {
    name: "Jane",
    age: 25,
    gender: "female",
    address: {
      street: "456 Main St",
      city: "New York",
      country: "USA",
      state: "NY",
      zip: "10001",
    },
  },
  {
    name: "Jack",
    age: 40,
    gender: "male",
    address: {
      street: "789 Main St",
      city: "New York",
      country: "USA",
      state: "NY",
      zip: "10001",
    },
  },
];

const resolvers = {
  Query: {
    getAllPersons: () => persons,
    getAddressByPersonName: (parent, args) => {
      const person = persons.find((p) => p.name === args.name);
      return `${person.address.street} ${person.address.city} ${person.address.state} ${person.address.zip} ${person.address.country}`;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at ${url}`);
