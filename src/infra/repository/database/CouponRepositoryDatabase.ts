import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";
import Database from "../../database/Database";

export default class CouponRepositoryDatabase implements CouponRepository {
  database: Database;
  
  constructor(database: Database) {
    this.database = database;
  }
  
  async getByCode(code: string): Promise<Coupon | undefined> {
    const couponData = await this.database.one('select * from ccca.coupon where code = $1', [code]);
    return new Coupon(couponData.code, couponData.percentage, new Date(couponData.expire_date));
  }
  
  async getCouponList(): Promise<Coupon[]> {
    const couponList = await this.database.many('select * from ccca.coupon', []);
    return couponList.map((dbCoupon: { code: string; percentage: number; expire_date: Date; }) => new Coupon(dbCoupon.code, dbCoupon.percentage, dbCoupon.expire_date));
  }

}