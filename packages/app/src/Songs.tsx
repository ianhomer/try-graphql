import { gql, useQuery } from "@apollo/client";
import { Song } from "@try-graphql/types";
import React from "react";
import "./App.css";

const GET_SONGS = gql`
  query {
    songs {
      name
      title
      seconds
    }
  }
`;

interface SongsResult {
  songs: Array<Song>;
}

function Songs() {
  const { loading, error, data } = useQuery<SongsResult>(GET_SONGS);

  return (
    <>
      <h1>Songs</h1>
      {error && <p>{JSON.stringify(error) || ""}</p>}
      {loading || !data ? (
        <p>Loading...</p>
      ) : (
        data.songs.map(({ name, title }) => (
          <div key={name}>
            <h2>{title}</h2>
          </div>
        ))
      )}
    </>
  );
}

export default Songs;
