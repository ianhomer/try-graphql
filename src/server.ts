import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import pino from "pino";

const logger = pino();

const schema = buildSchema(`
  type User {
    id: String
    name: String
    age: Int
  }
    
  type Query {
    quoteOfTheDay: String
    user(id: String): User
    users: [User]
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`);

const rollDice: ({
  numDice,
  numSides
}: {
  readonly numDice: number;
  readonly numSides: number;
}) => number[] = ({ numDice, numSides }) => {
  const output = [];
  for (const i = 0; i < numDice; i++) {
    output.push(1 + Math.floor(Math.random() * (numSides || 6)));
  }
  return output;
};

const USERS: { readonly [key: string]: any } = {
  abc: {
    age: 25,
    id: "abc",
    name: "Andy"
  },
  def: {
    age: 28,
    id: "def",
    name: "Betty"
  }
};

const user: ({ id }: { readonly id: number }) => any = ({ id }) => {
  return USERS[id];
};

const users = () => {
  return Object.values(USERS);
};

const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
  },
  rollDice,
  user,
  users 
};

const app = express();
app.use(
  "/graphql",
  graphqlHTTP({
    graphiql: true,
    rootValue: root,
    schema
  })
);

const port = 4040;
app.listen(port, () => {
  logger.info(`Express server listening on port ${port}`);
});
