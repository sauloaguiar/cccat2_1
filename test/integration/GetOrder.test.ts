import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import DistanceGatewayAPIMemory from '../../src/infra/gateway/memory/DistanceGatewayAPIMemory';
import ItemRepositoryMemory from '../../src/infra/repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';
import PlaceOrder from '../../src/application/PlaceOrder';
import PlaceOrderInput from '../../src/application/PlaceOrderInput';
import PgPromiseDatabase from '../../src/infra/database/PgPromiseDatabase';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase';
import ItemRepository from '../../src/domain/repository/ItemRepository';
import CouponRepository from '../../src/domain/repository/CouponRepository';
import GetOrder from '../../src/application/GetOrder';

const distanceGateway = new DistanceGatewayAPIMemory();

describe('GetOrder Tests', () => {

  test("Deve consultar um pedido", async function () {
    // crio um pedido para poder consulta-lo
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: "11.111-11",
        items: [
            { id: '1', quantity: 2},
            { id: '2', quantity: 1},
            { id: '3', quantity: 3}
        ],
        coupon: "VALE20"
    });
    const database = PgPromiseDatabase.getInstance();
    // const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), new CouponRepositoryMemory(), new OrderRepositoryMemory(), distanceGateway);
    // const placeOrder = new PlaceOrder(new ItemRepositoryDatabase(database), new CouponRepositoryMemory(), new OrderRepositoryMemory(), distanceGateway);
    const itemRepository = new ItemRepositoryDatabase(database);
    const couponRepository = new CouponRepositoryDatabase(database);
    const orderRepository = new OrderRepositoryMemory();
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, distanceGateway);
    const output = await placeOrder.execute(input);
    
    const getOrder = new GetOrder(itemRepository, couponRepository, orderRepository);
    const getOrderOutput = getOrder.execute(output.orderCode)
    expect(output.total).toBe(5982);
  });
})