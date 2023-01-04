import createResolvers from "./resolvers";

describe("resolvers", () => {
  it("should load songs", async () => {
    const resolvers = await createResolvers();
    const songs = await resolvers.songs();
    const song1 = songs.find((song) => song.name === "song-1");
    expect(song1).toBeDefined();
  });
});
