import { gql } from "@apollo/client";

export const GET_SONGS = gql`
  query {
    songs {
      name
      title
      seconds
    }
  }
`;
