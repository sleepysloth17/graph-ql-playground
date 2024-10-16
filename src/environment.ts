import "dotenv/config";

const environment = {
  dbHost: process.env.POSTGRES_HOST,
  dbPort: process.env.POSTGRES_PORT,
  db: process.env.POSTGRES_DB,
  dbUser: process.env.POSTGRES_USER,
  dbPassword: process.env.POSTGRES_PASSWORD,
};

export default environment;
