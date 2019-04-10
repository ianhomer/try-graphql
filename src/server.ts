import express from "express";
import graphqlHTTP from "express-graphql";
import { buildSchema } from "graphql";
import pino from "pino";

const logger = pino();

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = { hello: () => "Hello world!" };

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
