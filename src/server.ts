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

const rollDice = ({ numDice, numSides }) => {
  const output = [];
  for (const i = 0; i < numDice; i++) {
    output.push(1 + Math.floor(Math.random() * (numSides || 6)));
  }
  return output;
};

const USERS : { [key: string]: any } = {
  "abc": {
    age: 25,
    id: "abc",
    name: "Andy"
  },
    "def": {
        age: 28,
        id: "def",
        name: "Betty"
    }
};

const getUser = ({ id }) => {
  return USERS[id];
};

const getUsers = () => {
    return Object.values(USERS);
};

const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
  },
  rollDice,
  user: getUser,
    users: getUsers
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
