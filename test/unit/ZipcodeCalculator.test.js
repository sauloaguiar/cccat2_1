import DistanceGatewayAPIMemory from '../../src/infra/gateway/memory/DistanceGatewayAPIMemory';

test('Deve calcular a distancia entre dois ceps', () => {
  const distanceCalculator = new DistanceGatewayAPIMemory();
  const distance = distanceCalculator.calculate("11.111-111", "11.111-123");
  expect(distance).toBe(1000);
});