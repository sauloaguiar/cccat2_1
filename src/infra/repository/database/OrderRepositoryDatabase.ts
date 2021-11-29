import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Database from '../../database/Database';

export default class OrderRepositoryDatabase implements OrderRepository {
  database: Database;

  constructor(database: Database) {
    this.database = database;
  }


  async save(order: Order): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  async get(code: string): Promise<Order> {
    throw new Error("Method not implemented.");
  }
  
  async count(): Promise<number> {
    const countData = await  this.database.one("select count(*)::int ccca.order", []);

    throw new Error("Method not implemented.");
  }

}