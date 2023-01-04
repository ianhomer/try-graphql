import { Song } from "@try-graphql/types";
import fs from "fs";
import papa from "papaparse";
import path from "path";
import {
  DataTypes,
  Dialect,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Options,
  Sequelize,
} from "sequelize";

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

const SUPPORTED_DBS = ["sqlite"];
const databaseArguments = (): Options => {
  const dialect = process.env.DB_DIALECT;
  if (dialect) {
    const storage = process.env.DB_STORAGE;
    if (!storage) {
      throw "env DB_STORAGE must be set if DB_DIALECT is set";
    }
    console.log(`DB storage : ${storage}`);

    if (!SUPPORTED_DBS.includes(dialect)) {
      throw `env DB_DIALECT must be one of ${SUPPORTED_DBS}, it is  ${dialect}`;
    }
    return {
      dialect: dialect as Dialect,
      storage,
      logging: false,
    };
  }
  return {
    dialect: "sqlite",
    database: process.env.DB_NAME ?? "sqlite::memory",
    logging: false,
  };
};

class Repository {
  private sequelize;

  constructor() {
    this.sequelize = new Sequelize(databaseArguments());
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
          type: DataTypes.STRING,
        },
      },
      { sequelize: this.sequelize, tableName: "songs" }
    );

    await this.sequelize.sync();

    const stream = fs.createReadStream(path.join(__dirname, "data.csv"));
    await new Promise((resolve, reject) => {
      papa.parse(stream, {
        header: true,
        transformHeader: (name) => name.toLowerCase(),
        error: (error, file) => {
          console.error(`Cannot read CSV ${file} : ${error}`);
          reject();
        },
        complete: async (results) => {
          await Promise.all(
            results.data.map(
              async (result: any) => await SongDao.create(result)
            )
          );
          resolve(true);
        },
      });
    });
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
