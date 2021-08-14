import Coupon from "./Coupon";
import Order from "./Order"
import DistanceGateway from  './DistanceGateway';
import Item from "./Item";
import FreightCalculator from './FreightCalculator';
import PlaceOrderOutput from "./PlaceOrderOutput";
export default class PlaceOrder {
    coupons: Coupon[]; // replace with coupon repository
    distanceGateway: DistanceGateway
    orders: Order[];
    items: Item[];
    orderNumber: number;

    constructor (distanceGateway: DistanceGateway) {
        this.coupons = [
            new Coupon("VALE20", 20, new Date("2021-10-10")),
            new Coupon("EXPIRADO", 20, new Date("2011-10-10"))
        ];
        this.items = [
            new Item("1", "Guitarra", 1000, 100, 50, 15, 3),
            new Item("2", "Amplificador", 5000, 50, 50, 50, 22),
            new Item("3", "Cabo", 30, 10, 10, 10, 1)
        ],
        this.orders = [];
        this.distanceGateway = distanceGateway
        this.orderNumber = 0;
    }

    execute (input: any) : any {
        this.orderNumber++;
        const order = new Order(input.cpf, this.orderNumber);
        const distance = this.distanceGateway.calculate(input.zipcode, "99.999-99");
        for (const orderItem of input.items) {
            const item = this.items.find(item => item.id === orderItem.id)
            if (!item) throw new Error('Item not found');
            order.addItem(orderItem.id, item.price, orderItem.quantity);
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
            
        }
        if (input.coupon) {
            const coupon = this.coupons.find(coupon => coupon.code === input.coupon);
            if (coupon) order.addCoupon(coupon);
        }

        this.orders.push(order);
        return new PlaceOrderOutput({total: order.getTotal(), freight: order.freight, orderCode: order.getOrderNumber()})
    }
}
