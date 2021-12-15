import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import CouponRepository from "../domain/repository/CouponRepository";
import GetOrderOutput from "./GetOrderOutput";
import RepositoryFactory from "../domain/factory/RepositoryFactory";

export default class GetOrder { 
    itemRepository: ItemRepository;
    orderRepository: OrderRepository;
    couponRepository: CouponRepository;

    constructor (repositoryFactory: RepositoryFactory) {
			this.couponRepository = repositoryFactory.createCouponRepository();
			this.itemRepository = repositoryFactory.createItemRepository();
			this.orderRepository = repositoryFactory.createOrderRepository();
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
