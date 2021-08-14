export default class PlaceOrderOutput {
  freight: number;
  total: number;
  orderCode: string;

  constructor ({ freight, total, orderCode }: { freight: number, total: number, orderCode: string }) {
      this.freight = freight;
      this.total = total;
      this.orderCode =  orderCode;
  }
}