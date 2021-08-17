import Coupon from "./Coupon";
import Order from "./Order";

const couponDate = new Date("2021-10-10");

test("Não deve criar um pedido com CPF inválido", function () {
    const cpf = "111.111.111-11";
    expect(() => new Order(cpf)).toThrow(new Error("Invalid CPF"));
});

test("Deve criar um pedido com 3 itens", function () {
    const cpf = "778.278.412-36";
    const order = new Order(cpf);
    order.addItem("Guitarra", 1000, 2);
    order.addItem("Amplificador", 5000, 1);
    order.addItem("Cabo", 30, 3);
    const total = order.getTotal();
    expect(total).toBe(7090);
});

test("Deve criar um pedido com cupom de desconto", function () {
    const cpf = "778.278.412-36";
    const order = new Order(cpf);
    order.addItem("Guitarra", 1000, 2);
    order.addItem("Amplificador", 5000, 1);
    order.addItem("Cabo", 30, 3);
    order.addCoupon(new Coupon("VALE20", 20, couponDate));
    const total = order.getTotal();
    expect(total).toBe(5672);
});

test("Deve criar um pedido com coupon expirado", function() {
    const cpf = "778.278.412-36";
    const order = new Order(cpf);
    order.addItem("Guitarra", 1000, 2);
    order.addItem("Amplificador", 5000, 1);
    order.addItem("Cabo", 30, 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2020-10-10")));
    const total = order.getTotal();
    expect(total).toBe(7090);
});


test("Deve gerar o código do pedido", () => {
    const cpf = "778.278.412-36";
    const order = new Order(cpf, new Date(), 2);
    order.addItem("Guitarra", 1000, 2);
    order.addItem("Amplificador", 5000, 1);
    order.addItem("Cabo", 30, 3);
    order.addCoupon(new Coupon("VALE20", 20, new Date("2020-10-10")));
    expect(order.getOrderNumber()).toBe("202100000002");
})
