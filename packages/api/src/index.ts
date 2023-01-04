import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { graphqlHTTP } from "express-graphql";

console.log("Initialising API ...");
dotenv.config({ path: __dirname + "/../.env" });

import createResolvers from "./resolvers";
import schema from "./schema";

const app = express();

app.get("/", (_, res) => {
  res.send("GraphQL API is available at /graphql");
});

createResolvers().then((root) => {
  app.use(cors());
  app.use(
    "/graphql",
    graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    })
  );

  const PORT = 8080;
  const server = app.listen(PORT, () =>
    console.log(`Running GraphQL server on http://localhost:${PORT}`)
  );

  const closeHandler = async () => {
    server.close(async (error: any) => {
      console.log("GraphQL server closed");
      if (error) {
        console.error(`Error on close : ${error}`);
      }
      await root.close();
      process.exit(error ? 1 : 0);
    });
  };

  process.on("SIGTERM", closeHandler);
  process.on("SIGINT", closeHandler);
});
