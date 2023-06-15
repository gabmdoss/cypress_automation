describe('Transação', () => {

  beforeEach(() => {
    //hooks
    cy.visit("https://devfinance-agilizei.netlify.app/#")
  });
    
  it('Cadastrar valor de entrada', () => {
    cy.visit("https://devfinance-agilizei.netlify.app/#")
    
    createTransaction("Job", 600)
     cy.get('tbody tr td.description')
       .should('have.text', 'Job')
  });

  it('Cadastrar valor de saída', () => {
    createTransaction("Açaí", -20)
     cy.get('tbody tr td.description')
       .should('have.text', 'Açaí')
  });

  it('Excluir transação', () => {
    createTransaction("Job2", 600)
     cy.get('tbody tr td.description')
       .should('have.text', 'Job2')

    cy.contains(".description", "Job2")
      .parent()
      .find('img').click()
    
    cy.get('tbody').should("have.length", 1)
  });

});

function createTransaction(description, value) {
  cy.contains("+ Nova Transação").click()
  cy.get('#description').type(description)
  cy.get('#amount').type(value)
  cy.get('#date').type("2023-05-15")
  cy.get('button').click()
}