import TaxTable from "../entity/TaxTable";
import TaxCalculator from "./TaxCalculator";

export default class DefaultTaxCalculator extends TaxCalculator {

  getTax(taxTables: TaxTable[]): number {
    const table = taxTables.find(table => table.type === 'default');
    if (!table) return 0
    return table.value;
  }
}