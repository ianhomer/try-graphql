import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

import { Song } from "./types";

class SongDao
  extends Model<InferAttributes<SongDao>, InferCreationAttributes<SongDao>>
  implements Song
{
  declare name: string;
  declare title: string;
  declare seconds: number;
  declare album: string;
  declare artist: string;
  declare year: number;
}

class Repository {
  private sequelize;

  constructor() {
    this.sequelize = new Sequelize("sqlite::memory:");
  }

  async init() {
    SongDao.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        title: {
          type: DataTypes.STRING,
        },
        seconds: {
          type: DataTypes.BIGINT,
        },
        year: {
          type: DataTypes.INTEGER,
        },
        album: {
          type: DataTypes.STRING,
        },
        artist: {
          type: DataTypes.STRING
        }
      },
      { sequelize: this.sequelize, tableName: "songs" }
    );

    await this.sequelize.sync();
    await SongDao.create({
      name: "song-1",
      title: "Song 1",
      seconds: 3600,
      album: "album 1",
      artist: "artist-1",
      year: 1990
    });
    await SongDao.create({
      name: "song-2",
      title: "Song 2",
      seconds: 2400,
      album: "album 1",
      artist: "artist-1",
      year: 1990
    });
    console.log("... data loaded");
  }

  async findAllSongs(): Promise<Song[]> {
    return await SongDao.findAll();
  }

  async close() {
    console.log("Closing database");
    await this.sequelize.close();
    console.log("... closed database");
  }
}

export default Repository;
