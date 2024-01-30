export class ShoppingCartPage {
    
    // verifyProducts () {
    //     return cy.get('p').contains ("Buzo Negro");
    // }

    // verifyPrice () {
    //     // cy.xpath ("//div/p[contains(text(), 'Buzo Negro')]//following-sibling::p[text()='23.76']").contains('23.76');
    //     cy.get('p').contains('23.76');
    //     cy.xpath ("//div/p[contains(text(), 'Medias Negras')]//following-sibling::p[text()='5.43']").contains('5.43');
    // }

    constructor() {
        
        this.productName = '//*[@id="productName"]'; 
        this.productPrice = '//*[@id="unitPrice"]'; 
        this.productQuantity = '//*[@id="productAmount"]'; 
        this.totalPrice = '//*[@id="totalPrice"]'; 
        // this.showTotalPrice = '.css-n1d5pa > .chakra-button';
    };

    getProduct(name) {
        return cy.contains('li', name);
    }

    checkProductName (productName) {
        return cy.xpath(this.productName).contains('p#productName', productName);
    }

    getProductPrice (productPrice) {
        return cy.xpath(this.productPrice).contains('p#unitPrice', productPrice);
    }

    getQuantityProduct (productQuantity) {
        return cy.xpath(this.productQuantity).contains('p#productAmount', productQuantity);
    }

    getTotalPriceProduct (quantity, price) {
        return cy.xpath(this.totalPrice).contains('p#totalPrice', quantity*price);
    }

    showTotalPrice (totalPrice) {
        return cy.get('.css-n1d5pa > .chakra-button').wait(800);
    }

    totalAmmount () {
        return cy.xpath('//*[@id="price"]');
    }
 }