import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import TaxRepository from "../../domain/repository/TaxTableRepository";
import CouponRepositoryMemory from "../repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../repository/memory/OrderRepositoryMemory";
import StockEntryRepositoryMemory from "../repository/memory/StockEntryRepositoryMemory";
import TaxTableRepositoryMemory from "../repository/memory/TaxTableRepositoryMemory";

export default class MemoryRepositoryFactory implements RepositoryFactory {
  
  
  createItemRepository(): ItemRepository {
    return new ItemRepositoryMemory();
  }
  createOrderRepository(): OrderRepository {
    return OrderRepositoryMemory.getInstance()
  }
  createCouponRepository(): CouponRepository {
    return new CouponRepositoryMemory();
  }
  createTaxTableRepository(): TaxRepository {
    return new TaxTableRepositoryMemory();
  }
  createStockEntryRepository(): StockEntryRepository {
    return new StockEntryRepositoryMemory();
  }

}