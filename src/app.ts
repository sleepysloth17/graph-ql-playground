import environment from "./environment";

console.log(
  `Hello ${environment.dbHost}:${environment.dbPort}/${environment.db}`,
);
