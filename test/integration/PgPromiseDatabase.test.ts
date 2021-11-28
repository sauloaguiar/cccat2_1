import PgPromiseDatabase from '../../src/infra/database/PgPromiseDatabase';

describe("PgPromise Connector", () => {
  let pgPromiseDatabase: PgPromiseDatabase;
  
  beforeAll(() => {
    pgPromiseDatabase = PgPromiseDatabase.getInstance();
  })

  test("Deve conectar no banco de dados e listar os itens", async () => {  
    const items = await pgPromiseDatabase.many("select * from ccca.item", []);
    expect(items).toHaveLength(3);
  });

  test("Deve conectar no banco de dados e pegar um item", async () => {
    const item = await pgPromiseDatabase.one("select * from ccca.item where id = $1", [1]);
    expect(item.description).toBe("Guitarra");
  });

})