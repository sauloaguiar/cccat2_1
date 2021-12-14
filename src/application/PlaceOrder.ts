import Order from "../domain/entity/Order"
import DistanceGateway from  '../domain/gateway/DistanceGateway';
import FreightCalculator from '../domain/services/FreightCalculator';
import PlaceOrderOutput from "./PlaceOrderOutput";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import CouponRepository from "../domain/repository/CouponRepository";
export default class PlaceOrder {
    distanceGateway: DistanceGateway
    itemRepository: ItemRepository;
    orderRepository: OrderRepository;
    couponRepository: CouponRepository;

    constructor (itemRepository: ItemRepository, couponRepository: CouponRepository, orderRepository: OrderRepository, distanceGateway: DistanceGateway) {
        this.couponRepository = couponRepository;
        this.itemRepository = itemRepository;
        this.orderRepository = orderRepository;
        this.distanceGateway = distanceGateway
    }

    async execute (input: any) : Promise<PlaceOrderOutput> {
        const sequence = await this.orderRepository.count() + 1;
        const order = new Order(input.cpf, input.issueDate, sequence);
        const distance = this.distanceGateway.calculate(input.zipcode, "99.999-99");
        for (const orderItem of input.items) {
            const item = await this.itemRepository.getById(orderItem.id);
            if (!item) throw new Error('Item not found');
            order.addItem(orderItem.id, item.price, orderItem.quantity);
            const freight = FreightCalculator.calculate(distance, item) * orderItem.quantity;
            order.freight += freight;
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.getByCode(input.coupon);
            if (coupon) order.addCoupon(coupon);
        }

        await this.orderRepository.save(order);
        return new PlaceOrderOutput({total: order.getTotal(), freight: order.freight, orderCode: order.getOrderNumber()})
    }
}
