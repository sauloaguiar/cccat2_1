import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderCode from "./OrderCode";
import OrderItem from "./OrderItem";

export default class Order {
    cpf: Cpf;
    items: OrderItem[];
    coupon: Coupon | undefined;
    freight: number;
    issueDate: Date;
    code: OrderCode;
    sequence: number;
    taxes: number;

    constructor (cpf: string, issueDate: Date = new Date(), sequence: number = 1) {
        this.cpf = new Cpf(cpf);
        this.items = [];
        this.freight = 0;
        this.taxes = 0;
        this.issueDate = issueDate;
        this.sequence = sequence;
        this.code = new OrderCode(issueDate, sequence)
    }

    addItem (id: number, price: number, quantity: number) {
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

    getOrderNumber(): string {
        return this.code.value;
    }
}
