import StockEntry from "../../../domain/entity/StockEntry";
import StockEntryRepository from "../../../domain/repository/StockEntryRepository";

export default class StockEntryRepositoryMemory implements StockEntryRepository {
  stockEntries: StockEntry[];
  
  constructor() {
    this.stockEntries = [
      new StockEntry(1, "in", 10, new Date()),
      new StockEntry(2, "in", 10, new Date()),
      new StockEntry(3, "in", 10, new Date()),
    ]
  }

  getByIdItem(idItem: number): Promise<StockEntry[]> {
    return Promise.resolve(this.stockEntries.filter(stockEntry => stockEntry.idItem === idItem));
  }

  async save(stockEntry: StockEntry): Promise<void> {
    this.stockEntries.push(stockEntry)
  }

  async clean(): Promise<void> {
    this.stockEntries.filter(stockEntry => stockEntry.operation === 'in');
  }

}