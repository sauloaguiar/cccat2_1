import Coupon from "./Coupon";

export default class CouponRepository {
  couponList: Coupon[]

  constructor () {
    this.couponList = [];
    this.couponList.push(new Coupon("VALE20", 20, new Date(Date.parse("31/07/2021"))))
  }

  getCouponList() {
    return this.couponList
  }

}