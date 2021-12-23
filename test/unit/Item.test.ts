import Item from '../../src/domain/entity/Item';

test('Deve calcular o volume do item', () => {
  const item = new Item(1, "Amplificador", 5000, 50, 50, 50, 22);
  expect(item.getVolume()).toBe(0.125);
})

test('Deve calcular a densidade do item', () => {
  const item = new Item(1, "Amplificador", 5000, 50, 50, 50, 22);
  expect(item.getDensity()).toBe(176);
})