import Coupon from "./Coupon";
import Order from "./Order"
import DistanceGateway from  './DistanceGateway';

export default class PlaceOrder {
    coupons: Coupon[]; // replace with coupon repository
    distanceGateway: DistanceGateway
    orders: Order[];

    constructor (distanceGateway: DistanceGateway) {
        this.coupons = [
            new Coupon("VALE20", 20, new Date("2021-10-10")),
            new Coupon("EXPIRADO", 20, new Date("2011-10-10"))
        ];
        this.orders = [];
        this.distanceGateway = distanceGateway
    }

    execute (input: any) : any {
        const order = new Order(input.cpf);
        for (const item of input.items) {
            order.addItem(item.description, item.price, item.quantity);
        }
        if (input.coupon) {
            const coupon = this.coupons.find(coupon => coupon.code === input.coupon);
            if (coupon) order.addCoupon(coupon);
        }
        const total = order.getTotal();
        this.orders.push(order);
        return {
            total
        };
    }
}
