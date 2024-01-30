/// <reference types="cypress" />
// Importar la pagina de loginPage
// Importar la pagina de onlineShopPage
import { LoginPage } from "../support/Pages/loginPage";
import { ProductsPage } from "../support/Pages/productsPage";
import { ShoppingCartPage } from "../support/Pages/shoppingCartPage";

describe ('Pre-entrega', ()=> {
    //generar una instancia de la clase loginPage
    const loginPage = new LoginPage()
    //generar una instancia de la clase productsPage
    const productsPage = new ProductsPage()
    //generar una instancia de la clase shoppingCartPage
    const shoppingCartPage = new ShoppingCartPage()
    // let datos ;
    let products;

    before(() => {
        cy.fixture('products.json').then((data) => {
            products = data;   
        });
    });

    beforeEach("Pre-entrega", () => {
        cy.visit('');
        loginPage.clickButtonIniciarSesion().dblclick();
        loginPage.escribirUsuario(Cypress.env().usuario);
        loginPage.escribirContraseña(Cypress.env().password);
        loginPage.clickButtonLogIn().click();
        loginPage.verifyUser().should('exist');
    });

    it('Unico test', () => {
        
        productsPage.clickButtonOnlineShop();
        cy.wait(2000);
        
        //Agregar productos
        productsPage.addProducts(products.producto1.name);
        productsPage.addProducts(products.producto1.name);
        productsPage.addProducts(products.producto2.name);

        //Ir al carrito
        productsPage.goToShoppingCart();

        //Verificar nombres de productos
        shoppingCartPage.getProduct(products.producto1.name).should('include.text', products.producto1.name);
        shoppingCartPage.getProduct(products.producto2.name).should('include.text', products.producto2.name);

        // //Verificar cantidad
        shoppingCartPage.getQuantityProduct(products.producto1.quantity).should('include.text', products.producto1.quantity);
        shoppingCartPage.getQuantityProduct(products.producto2.quantity).should('include.text', products.producto2.quantity);

        //Verificar precios
        shoppingCartPage.getProductPrice(products.producto1.price).should('include.text', products.producto1.price);
        shoppingCartPage.getProductPrice(products.producto2.price).should('include.text', products.producto2.price);
        
        //Verificar precio total de cada producto
        shoppingCartPage.getTotalPriceProduct(products.producto1.price, products.producto1.quantity).should('include.text', products.producto1.price*products.producto1.quantity)
        shoppingCartPage.getTotalPriceProduct(products.producto2.price, products.producto2.quantity).should('include.text', products.producto2.price*products.producto2.quantity)
        
        // //Verificar precio total
        shoppingCartPage.showTotalPrice().click();
        shoppingCartPage.totalAmmount().should('include.text', '52.95');
        
        
    })
})
