export default class GetOrderOutput {
  freight: number;
  total: number;
  orderCode: string;
  orderItems: { itemDescription: string, price: number, quantity: number } []
  taxes: number;

  constructor ({ freight, taxes, total, orderCode, orderItems }: { freight: number, taxes:number, total: number, orderCode: string, orderItems: any[]}) {
      this.freight = freight;
      this.total = total;
      this.taxes = taxes;
      this.orderCode =  orderCode;
      this.orderItems = orderItems;
  }
}