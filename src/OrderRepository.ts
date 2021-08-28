import Order from "./Order";

export default interface OrderRepository {
  push(order: Order): void
}