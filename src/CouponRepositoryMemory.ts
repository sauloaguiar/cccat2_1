import Coupon from "./Coupon";
import CouponRepository from "./CouponRepository";


export default class CouponRepositoryMemory implements CouponRepository {
  couponList: Coupon[]

  constructor () {
    this.couponList = [
      new Coupon("VALE20", 20, new Date("2021-10-10")),
      new Coupon("EXPIRADO", 20, new Date("2011-10-10"))
  ];
  }
  
  getByCode(code: string): Coupon | undefined {
    return this.couponList.find(coupon => coupon.code === code);
  }

  getCouponList() {
    return this.couponList
  }

}