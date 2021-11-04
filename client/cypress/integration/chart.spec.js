describe('Chart scenarios', () => {  
    it('Chart is visible', () => {
        cy.visit('http://localhost:3000')

        cy.get('.App').should('be.visible')
    })

    // TODO: write more test scenarios
    it('more tests here', () => {});
  })
  