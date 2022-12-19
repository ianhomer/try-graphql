import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { createHandler } from "graphql-http/lib/use/node";
import http from "http";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "world",
      },
    },
  }),
});

// Create the GraphQL over HTTP Node request handler
const handler = createHandler({ schema });

// Create a HTTP server using the listner on `/graphql`
const server = http.createServer((req, res) => {
  if (req && req.url?.startsWith("/graphql")) {
    handler(req, res);
  } else {
    res.writeHead(404).end();
  }
});

server.listen(4000);
console.log('Listening to port 4000');
