import { Pool } from "pg";
import environment from "../environment";

export default new Pool({
  user: environment.PGUSER,
  password: environment.PGPASSWORD,
  host: environment.PGHOST,
  port: environment.PGPORT,
  database: environment.PGDATABASE,
});
