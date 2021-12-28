import PlaceOrderInput from "../../application/placeOrder/PlaceOrderInput";
import Order from "../entity/Order";
import StockEntry from "../entity/StockEntry";
import RepositoryFactory from "../factory/RepositoryFactory";
import DistanceGateway from "../gateway/DistanceGateway";
import CouponRepository from "../repository/CouponRepository";
import ItemRepository from "../repository/ItemRepository";
import OrderRepository from "../repository/OrderRepository";
import StockEntryRepository from "../repository/StockEntryRepository";
import TaxTableRepository from "../repository/TaxTableRepository";
import FreightCalculator from "./FreightCalculator";
import StockCalculator from "./StockCalculator";
import TaxCalculatorFactory from "./TaxCalculatorFactory";

// functiona como DomainService
// lógicas de domínio devem ser concentradas aqui
export default class OrderService {
  distanceGateway: DistanceGateway
  itemRepository: ItemRepository;
  orderRepository: OrderRepository;
  couponRepository: CouponRepository;
  taxTableRepository: TaxTableRepository;
  stockEntryRepository: StockEntryRepository;

  constructor (repositoryFactory: RepositoryFactory, distanceGateway: DistanceGateway) {
    this.couponRepository = repositoryFactory.createCouponRepository();
    this.itemRepository = repositoryFactory.createItemRepository();
    this.orderRepository = repositoryFactory.createOrderRepository();
    this.taxTableRepository = repositoryFactory.createTaxTableRepository();
    this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
    this.distanceGateway = distanceGateway
  }

  // o domain service conecta multiplos agregados
  async createOrder(input: PlaceOrderInput) {
    const sequence = await this.orderRepository.count() + 1;
    const order = new Order(input.cpf, input.issueDate, sequence);
    const distance = this.distanceGateway.calculate(input.zipcode, "99.999-99");
    const taxCalculator = TaxCalculatorFactory.create(input.issueDate)
    const stockCalculator = new StockCalculator();
    for (const orderItem of input.items) {
        const item = await this.itemRepository.getById(orderItem.id);
        if (!item) throw new Error('Item not found');
        order.addItem(orderItem.id, item.price, orderItem.quantity);
        const freight = FreightCalculator.calculate(distance, item) * orderItem.quantity;
        order.freight += freight;
        
        const taxTables = await this.taxTableRepository.getByIdItem(item.id);
        const taxes = taxCalculator.calculate(item, taxTables);
        order.taxes += taxes * orderItem.quantity;

        const stockEntries = await this.stockEntryRepository.getByIdItem(item.id);
        const quantity = stockCalculator.calculate(stockEntries);
        if (quantity < orderItem.quantity) {
          throw new Error('Out of Stock');
        }
        this.stockEntryRepository.save(new StockEntry(item.id, 'out', orderItem.quantity, new Date()))

    }
    if (input.coupon) {
        const coupon = await this.couponRepository.getByCode(input.coupon);
        if (coupon) order.addCoupon(coupon);
    }

    await this.orderRepository.save(order);
    return order;
  }

}