import { Song } from "@try-graphql/types";
import axios from "axios";

import Repository from "./repository";

const createResolvers = async () => {
  const repository = new Repository();
  await repository.init();

  return {
    songs: () => {
      return repository.findAllSongs();
    },
    summary: async () => {
      const songs = await repository.findAllSongs();
      const response = await axios<Song[]>({
        method: "post",
        url: "http://localhost:8081/api/echo",
        data: songs,
      });
      console.log(
        `${new Date().getTime()} : Summary count ${response.data.length}`
      );
      return {
        count: response.data.length,
      };
    },
    close: async () => {
      return repository.close();
    },
  };
};

export default createResolvers;
