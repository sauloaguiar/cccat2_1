export default class GetOrderOutput {
  freight: number;
  total: number;
  orderCode: string;
  orderItems: { itemDescription: string, price: number, quantity: number } []

  constructor ({ freight, total, orderCode, orderItems }: { freight: number, total: number, orderCode: string, orderItems: any[]}) {
      this.freight = freight;
      this.total = total;
      this.orderCode =  orderCode;
      this.orderItems = orderItems;
  }
}