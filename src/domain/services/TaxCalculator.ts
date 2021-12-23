import Item from "../entity/Item";
import TaxTable from "../entity/TaxTable";

export default abstract class TaxCalculator {
  constructor(){
  }

  calculate(item: Item, taxTables: TaxTable[]){
    return (item.price * this.getTax(taxTables))/100;
  }

  abstract getTax(taxTables: TaxTable[]): number;
}