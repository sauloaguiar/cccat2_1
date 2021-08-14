import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {
    cpf: Cpf;
    items: OrderItem[];
    coupon: Coupon | undefined;
    freight: number;
    orderNumber: number;

    constructor (cpf: string, orderNumber: number) {
        this.cpf = new Cpf(cpf);
        this.items = [];
        this.freight = 0;
        this.orderNumber = orderNumber;
    }

    addItem (description: string, price: number, quantity: number) {
        this.items.push(new OrderItem(description, price, quantity));
    }

    addCoupon (coupon: Coupon) {
        if (!coupon?.isExpired()) {
            this.coupon = coupon;
        }
    }

    getTotal () {
        let total = 0;
        for (const orderItem of this.items) {
            total += orderItem.getTotal();
        }
        if (this.coupon) {
            total -= (total * this.coupon.percentage)/100;
        }
        total += this.freight;
        return total;
    }

    getOrderNumber() {
        return (new Date().getFullYear()) + this.zeroPad(this.orderNumber, 8);
    }

    private zeroPad(number: number, pad: number) {
        return String(number).padStart(pad, "0");
    }
}
