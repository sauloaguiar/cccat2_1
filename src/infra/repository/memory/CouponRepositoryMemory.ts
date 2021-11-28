import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";


export default class CouponRepositoryMemory implements CouponRepository {
  couponList: Coupon[]

  constructor () {
    this.couponList = [
      new Coupon("VALE20", 20, new Date("2022-10-10")),
      new Coupon("VALE20_EXPIRED", 20, new Date("2020-10-10"))
  ];
  }
  
  async getByCode(code: string): Promise<Coupon | undefined> {
    return Promise.resolve(this.couponList.find(coupon => coupon.code === code));
  }

  async getCouponList() {
    return Promise.resolve(this.couponList);
  }

}