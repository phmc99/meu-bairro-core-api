const devEnv = {
  type: "postgres",
  host: "ec2-52-21-136-176.compute-1.amazonaws.com",
  port: "5432",
  database: "d283qt583ev74k",
  username: "wynnpzenyfqhei",
  password: "96ccae98d576690fe77d646bbe4eef1e63c66e9b84901fc8da8df5d80b0f8fae",
  entities: ["./src/entities/**/*.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
  },
  logging: true,
  synchronize: false,
  ssl: { rejectUnauthorized: false }
};

const prodEnv = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: ["./dist/entities/**/*.js"],
  migrations: ["./dist/database/migrations/*.js"],
  cli: {
    migrationsDir: "./dist/database/migrations",
  },
  synchronize: false,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
};

let exportModule = undefined;

if (process.env.NODE_ENV === "production") {
  exportModule = prodEnv;
} else {
  exportModule = devEnv;
}

module.exports = exportModule;
