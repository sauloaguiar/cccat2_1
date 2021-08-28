import Item from '../entity/Item';

export default interface ItemRepository {
  getById(id: String): Item | undefined
}