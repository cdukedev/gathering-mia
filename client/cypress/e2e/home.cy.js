describe("empty spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/gathering");
  }),
    it("passes", () => {
      cy.get("[data-test=home]");
    });
});
