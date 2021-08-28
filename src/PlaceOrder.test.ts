import DistanceGatewayAPIMemory from './DistanceGatewayAPIMemory';
import ItemRepositoryMemory from './ItemRepositoryMemory';
import PlaceOrder from "./PlaceOrder";
import PlaceOrderInput from './PlaceOrderInput';

const distanceGateway = new DistanceGatewayAPIMemory();

test("Deve fazer um pedido", function () {
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

    const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), distanceGateway);
    const output = placeOrder.execute(input);
    expect(output.total).toBe(5982);
});

test("Deve fazer um pedido com coupon de desconto expirado", function () {

    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: "11.111-11",
        items: [
            { id: '1', quantity: 2},
            { id: '2', quantity: 1},
            { id: '3', quantity: 3}
        ],
        coupon: "EXPIRED"
    });

    const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), distanceGateway);
    const output = placeOrder.execute(input);
    expect(output.total).toBe(7400);
});

test("Deve custar R$ 30,00 para enviar guitarra", () => {
    const input = new PlaceOrderInput({
        cpf: "778.278.412-36",
        zipcode: '11.111-111',
        items: [
            { id: "1", quantity: 2},
            { id: "2", quantity: 1},
            { id: "3", quantity: 3}
        ],
        coupon: "EXPIRED"
    });
    
    const placeOrder = new PlaceOrder(new ItemRepositoryMemory(), distanceGateway);
    const output = placeOrder.execute(input);
    expect(output.freight).toBe(310);
});

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

