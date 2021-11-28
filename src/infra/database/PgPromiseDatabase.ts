import pgp from "pg-promise";
import Database from "./Database"

export default class PgPromiseDatabase implements Database {
  private pgp: any;
  static instance: PgPromiseDatabase
  
  static getInstance()  {
    if (!PgPromiseDatabase.instance) {
      PgPromiseDatabase.instance = new PgPromiseDatabase();
    }
    return PgPromiseDatabase.instance;
  }

  private constructor() {
    this.pgp = pgp()("postgres://ccca:123456@localhost:5432")
  }

  many(query: string, parameters: any) {
    return this.pgp.query(query, parameters);
  }
  one(query: string, parameters: any) {
    return this.pgp.oneOrNone(query, parameters);
  }

}