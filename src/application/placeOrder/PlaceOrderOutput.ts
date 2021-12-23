export default class PlaceOrderOutput {
  freight: number;
  total: number;
  orderCode: string;
  taxes: number;

  constructor ({ freight, taxes, total, orderCode }: { freight: number, taxes: number, total: number, orderCode: string }) {
      this.freight = freight;
      this.total = total;
      this.taxes = taxes;
      this.orderCode =  orderCode;
  }
}