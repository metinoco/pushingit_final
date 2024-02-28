export class ProductsPage {

    clickButtonOnlineShop() {
        cy.get("#onlineshoplink").click();
    }

    addProducts(name) {
        cy.get(`[name='${name}']`).click();
        cy.get('#closeModal').click();
    }

    goToShoppingCart() {
        cy.get('.css-1ktw94t > [data-cy="goShoppingCart"]').click();
    }
}

