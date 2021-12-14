import Order from "../domain/entity/Order"
import DistanceGateway from  '../domain/gateway/DistanceGateway';
import FreightCalculator from '../domain/services/FreightCalculator';
import PlaceOrderOutput from "./PlaceOrderOutput";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import CouponRepository from "../domain/repository/CouponRepository";
import GetOrderOutput from "./GetOrderOutput";

export default class GetOrder { 
    itemRepository: ItemRepository;
    orderRepository: OrderRepository;
    couponRepository: CouponRepository;

    constructor (itemRepository: ItemRepository, couponRepository: CouponRepository, orderRepository: OrderRepository) {
			this.couponRepository = couponRepository;
			this.itemRepository = itemRepository;
			this.orderRepository = orderRepository;
    }

    async execute (code: string) : Promise<GetOrderOutput> {
			const order = await this.orderRepository.get(code);
			const orderItems: any[] = [];

			for (const orderItem of order.items) {
				const item = await this.itemRepository.getById(orderItem.id);
				const orderItemOutput = {
					itemDescription: item?.description,
					price: orderItem.price,
					quantity: orderItem.quantity
				}
				orderItems.push(orderItemOutput);
			}

			return new GetOrderOutput({
				orderCode: order.getOrderNumber(),
				freight: order.freight,
				total: order.getTotal(),
				orderItems
			})

    }
}
