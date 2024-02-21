export class ShoppingCartPage {
    
    constructor() {
        
        this.productName = '//*[@id="productName"]'; 
        this.productPrice = '//*[@id="unitPrice"]'; 
        this.productQuantity = '//*[@id="productAmount"]'; 
        this.totalPrice = '//*[@id="totalPrice"]';
        this.checkoutLink = '#goCheckout';
        
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

    goToCheckout () {
        cy.get(this.checkoutLink).click();
        }
}
