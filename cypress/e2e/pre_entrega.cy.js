/// <reference types="cypress" />
// Importar la pagina de loginPage
// Importar la pagina de onlineShopPage
import { LoginPage } from "../support/Pages/loginPage";
import { ProductsPage } from "../support/Pages/productsPage";
import { ShoppingCartPage } from "../support/Pages/shoppingCartPage";

describe ('Entrega final', ()=> {
    let token ;
    let products;
    const baseUrl = 'https://pushing-it.onrender.com';
    //generar una instancia de la clase loginPage
    const loginPage = new LoginPage()
    //generar una instancia de la clase productsPage
    const productsPage = new ProductsPage()
    //generar una instancia de la clase shoppingCartPage
    const shoppingCartPage = new ShoppingCartPage()
    
    before(() => {
        cy.fixture('products.json').then((data) => {
            products = data;   
        });

        cy.visit('');
        //Enviar una petición HTTP que registre un nuevo usuario
        cy.request({
            method: "POST",
            url: `${baseUrl}/api/register`,
            headers: {
                "authorization": `Bearer ${token}`
            },
            body:
            {
                username: 'monshy' + Math.floor(Math.random() * 1000),
                password: '1234567!',
                gender:'Male',
                year: '1986',
                month: '6',
                day: '16'
            },
        }).then(response => {
            cy.log(response);
            expect(response.status).to.be.equal(201);
            expect(`${response.body.newUser.username}`).exist;

            //Enviar una petición HTTP que haga login con el nuevo usuario
            cy.request({
                method: "POST",
                url: `${baseUrl}/api/login`,
                headers: {
                    "authorization": `Bearer ${token}`,
                },
                body:
                {
                    "username": `${response.body.newUser.username}`,
                    "password": "1234567!",
                },
            }).then((response) => {
                cy.log(response);
                window.localStorage.setItem('token', response.body.token);
                window.localStorage.setItem('username', response.body.user.username);
                window.localStorage.setItem('userId', response.body.user._id);
                expect(response.status).to.equal(201);
                expect(`${response.body.user.username}`).exist;
                
            });
            cy.reload();
            productsPage.clickButtonOnlineShop();
    });
});

    it('Unico test', () => {
        
        
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
        shoppingCartPage.getQuantityProduct(products.producto1.name).should('include.text', products.producto1.quantity);
        shoppingCartPage.getQuantityProduct(products.producto2.name).should('include.text', products.producto2.quantity);

        //Verificar precios
        shoppingCartPage.getProductPrice(products.producto1.name).should('include.text', products.producto1.price);
        shoppingCartPage.getProductPrice(products.producto2.name).should('include.text', products.producto2.price);
        
        //Verificar precio total de cada producto
        shoppingCartPage.getTotalPriceProduct(products.producto1.price, products.producto1.quantity).should('include.text', products.producto1.price*products.producto1.quantity)
        shoppingCartPage.getTotalPriceProduct(products.producto2.price, products.producto2.quantity).should('include.text', products.producto2.price*products.producto2.quantity)
        
        // //Verificar precio total
        shoppingCartPage.showTotalPrice().click();
        shoppingCartPage.totalAmmount().should('include.text', '52.95');
        
        
    })
})
