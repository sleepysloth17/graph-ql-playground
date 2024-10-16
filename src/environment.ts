import "dotenv/config";

const environment = {
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGHOST: process.env.PGHOST,
  PGPORT: +process.env.PGPORT,
  PGDATABASE: process.env.PGDATABASE,
  SERVER_PORT: +process.env.SERVER_PORT,
};

export default environment;
