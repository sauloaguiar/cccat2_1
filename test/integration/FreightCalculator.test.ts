import FreightCalculator from '../../src/domain/services/FreightCalculator';
import Item from '../../src/domain/entity/Item';

test('Deve custar R$ 30,00 para enviar uma guitarra', () => {
  const guitarra = new Item("1", "Guitarra", 1000, 100, 50, 15, 3);
  const distance = 1000;
  const cost = FreightCalculator.calculate(distance, guitarra);
  expect(cost).toBe(30);
});

test('Deve custar R$ 220,00 para enviar um aplificador', () => {
  const item = new Item("2", "Amplificador", 5000, 50, 50, 50, 22);
  const distance = 1000;
  const cost = FreightCalculator.calculate(distance, item);
  expect(cost).toBe(220);
});

test('Deve custar R$ 10,00 para enviar um cabo', () => {
  const item = new Item("3", "Cabo", 30, 10, 10, 10, 1)
  const distance = 1000;
  const cost = FreightCalculator.calculate(distance, item);
  expect(cost).toBe(10);
});