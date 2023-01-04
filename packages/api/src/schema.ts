import { buildSchema } from "graphql";

const schema = buildSchema(`
  type Song {
    id: String
    name: String
    title: String
    year: Int
    artist: String
    seconds: Int
  }

  type Artist {
    id: String
    name: String
    description: String
  }

  type Summary {
    count: Int
  }

  type Query {
    song(id: String!): Song
    songs: [Song]
    summary: Summary
  }
`);

export default schema;
