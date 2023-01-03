import Repository from "./repository";

const repository = new Repository();
repository.init();

const resolvers = {
  songs: () => {
    return repository.findAllSongs();
  },
  close: async () => { 
    return repository.close();
  },
};

export default resolvers;
