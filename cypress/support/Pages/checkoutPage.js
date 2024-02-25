export class CheckoutPage {
    constructor () {
        this.firstName = '[data-cy="firstName"]';
        this.lastName = '[data-cy="lastName"]';
        this.cardNumber = '[data-cy="cardNumber"]';
        this.purchaseButton = '[data-cy="purchase"]';
    }

    completeForm (name, lastName, cardNumber) {
        cy.get(this.firstName).type (name);
        cy.get(this.lastName).type(lastName);
        cy.get(this.cardNumber).type(cardNumber);
    }

    goToPurchase(){ 
        cy.get(this.purchaseButton).click();
    }
}