import { createConnection } from "mysql2";

export const db = createConnection({
  host: "localhost",
  user: "root",
  password: "12^AdmiN^12",
  database: "taskoo",
});
