export default class PlaceOrderInput {
  cpf: string;
  zipcode: string;
  items: any;
  coupon: string;
  issueDate: Date;

  constructor ({ cpf, zipcode, items, issueDate = new Date(), coupon }: { cpf: string, zipcode: string, issueDate?: Date, items: any, coupon: string }) {
      this.cpf = cpf;
      this.zipcode = zipcode;
      this.items = items;
      this.coupon = coupon;
      this.issueDate = issueDate;
  }
}