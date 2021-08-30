Este conteúdo é parte do curso Clean Code e Clean Architecture da Branas.io

Para mais informações acesse:

https://app.branas.io/clean-code-e-clean-architecture

Instruções:

npm install
npm run test

## Definições

- Dependa de abstrações e não de implementações.
  - "High level modules and low level modules must depend on abstractions"
  - "The high-level components such as the User Interface or the View Model components must not have a direct dependency on the low-level components during a flow of execution."

- Inversão de Dependência
  - Dependências de baixo nível pertencentes a uma classe de alto nível são injetadas via construtor.

- Repositório é uma abstração de uma coleção. A coleção pode ser implementada de diferentes formas.
  - Um repositório pode ser definido via interface onde os métodos expõe o comportamento desejado - conhecido como contrato.
  - Contratos pertencem ao domínio da aplicação. A implementação equivalente pertence a outra camada, por exemplo, infra.
  - Primeiro define-se o contrato para que ele possa reger a implementação.
