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
        
    };

    getProduct(name) {
        return cy.contains('li', name);
    }

    checkProductName (productName) {
        return cy.xpath(this.productName).contains('p#productName', productName);
    }

    getProductPrice (productPrice) {
        // return cy.xpath(this.productPrice).contains('p#unitPrice', productPrice);
        return cy.contains(productPrice).siblings("p#unitPrice");
    }

    getQuantityProduct (productQuantity) {
        // return cy.xpath(this.productQuantity).contains('p#productAmount', productQuantity);
        return cy.contains(productQuantity).siblings("p#productAmount");
    }

    getTotalPriceProduct (product) {
        // return cy.xpath(this.totalPrice).contains('p#totalPrice', quantity*price);
        return cy.contains(product).siblings("p#totalPrice");
    }

    showTotalPrice (totalPrice) {
        return cy.get('.css-n1d5pa > .chakra-button').wait(800);
    }

    totalAmmount () {
        return cy.xpath('//*[@id="price"]');
    }
 }