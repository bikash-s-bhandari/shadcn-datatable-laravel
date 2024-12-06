import "reflect-metadata";
import { DataSource } from "typeorm";

// entity imports
import Entities from "../entity";
import seedDatabase from "./seed-database";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [...Object.values(Entities)],
});

const connectDatabase = async () => {
  try {
    const response = await AppDataSource.initialize();

    console.log("Database connected successfully");

    seedDatabase();

    return response;
  } catch (error: any) {
    console.error(`Error in database connection: ${error.message}`);
    process.exit(1);
  }
};

export default connectDatabase;
