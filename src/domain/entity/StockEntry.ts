export default class StockEntry {
  quantity: number;
  operation: string;
  idItem: number;
  date: Date;
  
  constructor(idItem: number, operation: string, quantity: number, date: Date) {
    this.idItem = idItem;
    this.operation = operation;
    this.quantity = quantity;
    this.date = date;
  }
}