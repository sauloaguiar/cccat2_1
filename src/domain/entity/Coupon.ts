export default class Coupon {
    code: string;
    percentage: number;
    expiringDate: Date;

    constructor (code: string, percentage: number, expiringDate: Date) {
        this.code = code;
        this.percentage = percentage;
        this.expiringDate = expiringDate;
    }

    isExpired() {
        return (new Date().getTime()) >= this.expiringDate.getTime()
    }
}
