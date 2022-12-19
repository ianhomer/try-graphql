import express from "express";
import { graphqlHTTP } from "express-graphql";

import schema from "./schema";

const app = express();

app.get("/", (req, res) => {
  res.send("GraphQL is OK");
});

class Product {
  constructor(id, { name, description, price, soldout, stores }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.id = id;
  }
}

const productDatabase = {};

const root = {
  product: () => {
    return {
      id: 123,
      name: "something",
      description: "Something description",
      price: 30.99,
      soldout: false,
      stores: [{ store: "London" }, { store: "Manchester" }],
    };
  },
  createProduct: ({ input }) => {
    let id = require("crypto").randomBytes(10).toString("hex");
    productDatabase[id] = input;
    return new Product(id, input);
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(8080, () => console.log("Running server"));
