import CouponRepository from "../repository/CouponRepository";
import ItemRepository from "../repository/ItemRepository";
import OrderRepository from "../repository/OrderRepository";
import TaxTableRepository from "../repository/TaxRepository";

export default interface RepositoryFactory {
  createItemRepository(): ItemRepository;
  createOrderRepository(): OrderRepository;
  createCouponRepository(): CouponRepository;
  createTaxTableRepository(): TaxTableRepository;
}