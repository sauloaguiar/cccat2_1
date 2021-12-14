import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
  orders: Order[];
  
  constructor() {
    this.orders = []
  }
  get(code: string): Promise<Order> {
    const order = this.orders.find(order => order.code.value === code);
    if (!order) {
      throw new Error("Order not found")
    }
    return Promise.resolve(order);
  }

  count(): Promise<number> {
    return Promise.resolve(this.orders.length);
  }
  
  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

}