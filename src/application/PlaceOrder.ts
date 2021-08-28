import Coupon from "../domain/entity/Coupon";
import Order from "../domain/entity/Order"
import DistanceGateway from  '../domain/gateway/DistanceGateway';
import Item from "../domain/entity/Item";
import FreightCalculator from '../domain/services/FreightCalculator';
import PlaceOrderOutput from "./PlaceOrderOutput";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import CouponRepository from "../domain/repository/CouponRepository";
export default class PlaceOrder {
    distanceGateway: DistanceGateway
    orderNumber: number;
    itemRepository: ItemRepository;
    orderRepository: OrderRepository;
    couponRepository: CouponRepository;

    constructor (itemRepository: ItemRepository, couponRepository: CouponRepository, orderRepository: OrderRepository, distanceGateway: DistanceGateway) {
        this.couponRepository = couponRepository;
        this.itemRepository = itemRepository;
        this.orderRepository = orderRepository;
        this.distanceGateway = distanceGateway
        this.orderNumber = 0;
    }

    execute (input: any) : any {
        this.orderNumber++;
        const order = new Order(input.cpf);
        const distance = this.distanceGateway.calculate(input.zipcode, "99.999-99");
        for (const orderItem of input.items) {
            const item = this.itemRepository.getById(orderItem.id);
            if (!item) throw new Error('Item not found');
            order.addItem(orderItem.id, item.price, orderItem.quantity);
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
        }
        if (input.coupon) {
            const coupon = this.couponRepository.getByCode(input.coupon);
            if (coupon) order.addCoupon(coupon);
        }

        this.orderRepository.save(order);
        return new PlaceOrderOutput({total: order.getTotal(), freight: order.freight, orderCode: order.getOrderNumber()})
    }
}
