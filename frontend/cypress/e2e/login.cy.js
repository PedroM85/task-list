describe('Login', () => {
    it('Debería hacer login con credenciales válidas', () => {
        cy.visit('http://localhost:5173');
        cy.get('[data-cy="email"]').type('test@unelsoft.com');
        cy.get('[data-cy="password"]').type('123456');
        cy.get('[data-cy="login-button"]').click();
        cy.url().should('include', '/dashboard');
        cy.contains('Agregar tarea').should('exist');
    });
});
