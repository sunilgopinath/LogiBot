describe('LogiBot E2E', () => {
    beforeEach(() => {
      cy.visit('/'); // baseUrl is http://localhost:3001
    });
  
    it('displays welcome message on load', () => {
      cy.contains('Welcome to LogiBot').should('be.visible');
    });
  
    it('tracks a shipment successfully', () => {
      cy.get('input[placeholder="e.g., Where is shipment #123?"]')
        .type('Where is shipment #123?');
      cy.get('button').contains('Submit').click();
      cy.contains('Shipment #123').should('be.visible');
      cy.contains('In Transit').should('be.visible');
      cy.contains('Chicago').should('be.visible');
      cy.contains('March 16, 2025').should('be.visible');
    });
  
    it('shows error for invalid shipment', () => {
      cy.get('input[placeholder="e.g., Where is shipment #123?"]')
        .type('Where is shipment #999?');
      cy.get('button').contains('Submit').click();
      cy.contains('Shipment #999 not found').should('be.visible');
    });
  });