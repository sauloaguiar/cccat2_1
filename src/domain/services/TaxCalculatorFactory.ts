import DefaultTaxCalculator from "./DefaultTaxCalculator";
import NovemberTaxCalculator from "./NovemberTaxCalculator";
import TaxCalculator from "./TaxCalculator";

export default class TaxCalculatorFactory {
  static create(date: Date): TaxCalculator {
    if (date.getMonth() === 10) {
      return new NovemberTaxCalculator();
    }

    return new DefaultTaxCalculator();
  }
}