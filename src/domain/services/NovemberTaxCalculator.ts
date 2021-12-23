
import TaxTable from "../entity/TaxTable";
import TaxCalculator from "./TaxCalculator";

export default class NovemberTaxCalculator extends TaxCalculator {

  getTax(taxTables: TaxTable[]): number {
    const table = taxTables.find(table => table.type === 'november');
    if (!table) return 0
    return table.value;
  }
}