import { DataTypes, Sequelize } from "sequelize";

class Repository {
  constructor() {
    this.sequelize = new Sequelize("sqlite::memory:");
    this.Song = this.sequelize.define("Song", {
      name: DataTypes.STRING,
      title: DataTypes.STRING,
    });
  }

  async init() {
    await this.sequelize.sync();
    await this.Song.create({
      name: "song-1",
      title: "Song 1",
    });
    await this.Song.create({
      name: "song-2",
      title: "Song 2",
    });
    console.log("... data loaded");
  }

  async findAllSongs() {
    return await this.Song.findAll();
  }

  async close() {
    console.log("Closing database");
    await this.sequelize.close();
    console.log("... closed database")
  }
}

export default Repository;
