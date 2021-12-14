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
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';

const distanceGateway = new DistanceGatewayAPIMemory();

describe('PlaceOrder Tests', () => {

    // let database: PgPromiseDatabase;
    // beforeEach(() => {
    //     database = new PgPromiseDatabase();
    // })

    test("Deve fazer um pedido", async function () {
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
        const itemRepository = new ItemRepositoryDatabase(database);
        const couponRepository = new CouponRepositoryDatabase(database);
        const orderRepository = new OrderRepositoryDatabase(database);
        await orderRepository.clean();
        const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, distanceGateway);
        const output = await placeOrder.execute(input);
        expect(output.total).toBe(5982);
    });

test("Deve fazer um pedido com coupon de desconto expirado", async function () {

        const input = new PlaceOrderInput({
            cpf: "778.278.412-36",
            zipcode: "11.111-11",
            items: [
                { id: '1', quantity: 2},
                { id: '2', quantity: 1},
                { id: '3', quantity: 3}
            ],
            coupon: "VALE20_EXPIRED"
        });

        // const database = new PgPromiseDatabase();
        const database = PgPromiseDatabase.getInstance();
        const itemRepository = new ItemRepositoryDatabase(database);
        const couponRepository = new CouponRepositoryDatabase(database);
        const orderRepository = new OrderRepositoryDatabase(database);
        const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, distanceGateway);
        const output = await placeOrder.execute(input);
        expect(output.total).toBe(7400);
    });

    test("Deve custar R$ 30,00 para enviar guitarra", async () => {
        const input = new PlaceOrderInput({
            cpf: "778.278.412-36",
            zipcode: '11.111-111',
            items: [
                { id: "1", quantity: 2},
                { id: "2", quantity: 1},
                { id: "3", quantity: 3}
            ],
            coupon: "VALE20_EXPIRED"
        });
        
        // const database = new PgPromiseDatabase();
        const database = PgPromiseDatabase.getInstance();
        // const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), new CouponRepositoryMemory(), new OrderRepositoryMemory(), distanceGateway);
        // const placeOrder = new PlaceOrder(new ItemRepositoryDatabase(database), new CouponRepositoryMemory(), new OrderRepositoryMemory(), distanceGateway);
        const placeOrder = new PlaceOrder(new ItemRepositoryDatabase(database), new CouponRepositoryDatabase(database), new OrderRepositoryMemory(), distanceGateway);
        const output = await placeOrder.execute(input);
        expect(output.freight).toBe(310);
    });

    test("Deve fazer um pedido gerando um código", async () => {
        const input = new PlaceOrderInput({
            cpf: "778.278.412-36",
            zipcode: '11.111-111',
            items: [
                { id: "1", quantity: 2},
                { id: "2", quantity: 1},
                { id: "3", quantity: 3}
            ],
            issueDate: new Date(),
            coupon: "VALE20_EXPIRED"
        });
        const itemRepository = new ItemRepositoryMemory();
        const couponRepository = new CouponRepositoryMemory();
        const orderRepository = new OrderRepositoryMemory();
        const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, distanceGateway);
        const output = await placeOrder.execute(input);
        expect(output.orderCode).toBe("202100000001")
    })

    // test("Deve gerar informações do pedido", () => {
    //     const cpf = "778.278.412-36"
    //     const zipcode = '11.111-111';
    //     const input = {
    //         cpf,
    //         zipcode,
    //         items: [
    //             { id: "1", quantity: 2},
    //             { id: "2", quantity: 1},
    //             { id: "3", quantity: 3}
    //         ]
    //     };

    //     const placeOrder = new PlaceOrder(distanceGateway);
    //     const output = placeOrder.execute(input);
    //     // check for orderCode, cpf, zipcode, items, price, quantity, discount?, freight, total
    //     expect(output.getOrderInfo()).toBe({
    //         cpf,
    //     });
    // })
})
