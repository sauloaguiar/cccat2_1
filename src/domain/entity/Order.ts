import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {
    cpf: Cpf;
    items: OrderItem[];
    coupon: Coupon | undefined;
    freight: number;
    sequence: number;
    issueDate: Date;

    constructor (cpf: string, issueDate: Date = new Date(), sequence: number = 1) {
        this.cpf = new Cpf(cpf);
        this.items = [];
        this.freight = 0;
        this.issueDate = issueDate;
        this.sequence = sequence;
    }

    addItem (id: string, price: number, quantity: number) {
        this.items.push(new OrderItem(id, price, quantity));
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
            const discount = (total * this.coupon.percentage)/100;
            total -= discount;
        }
        total += this.freight;

        return total;
    }

    getOrderNumber() {
        return (this.issueDate.getFullYear()) + this.zeroPad(this.sequence, 8);
    }

    private zeroPad(number: number, pad: number) {
        return String(number).padStart(pad, "0");
    }
}
