describe("Use the order form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001/pizza");
  });

  it("inputs a name at least two characters long", () => {
    cy.get('[cy-data="name"]')
      .type("Ben Venker")
      .should("have.value", "Ben Venker");
  });

  it("can select multiple toppings", () => {
    cy.get('[cy-data="canadian-bacon"]').check().should("be.checked");
    cy.get('[cy-data="pepperoni"]').check().should("be.checked");
    cy.get('[cy-data="sausage"]').check().should("be.checked");
  });

  it("can submit the form", () => {
    cy.get("form").submit();
  });
});
