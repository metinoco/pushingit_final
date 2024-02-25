export class ReciptPage {

    constructor() {
        // this.firstName = '#name';
        this.firstName = '[data-cy="name"]'
        // this.lastName = '[data-cy="name"]'
        this.numberCard = '[data-cy="creditCard"]';
        this.totalCost = '[data-cy="totalPrice"]';
    }
    
    getNameRecipt () {
        return cy.get(this.firstName);
    }

    getReciptProduct (productName) {
        return cy.contains ('p', productName);
    }

    getNumberCard () {
        return cy.get(this.numberCard);
    }

    getMoneySpent () {
        return cy.get(this.totalCost);
    }
}