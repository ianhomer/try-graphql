import express from "express";
import { graphqlHTTP } from "express-graphql";

import resolvers from "./resolvers";
import schema from "./schema";

const app = express();

app.get("/", (req, res) => {
  res.send("GraphQL is OK");
});

const root = resolvers;

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const server = app.listen(8080, () => console.log("Running server"));

const closeHandler = async () => {
  server.close(async (error) => {
    console.log("Server closed");
    if (error) {
      console.error(`Error on close : ${error}`);
    }
    await root.close();
    process.exit(error ? 1 : 0);
  });
}; 

process.on("SIGTERM", closeHandler);
process.on("SIGINT", closeHandler);
