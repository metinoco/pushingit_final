/// <reference types="cypress" />
import { LoginPage } from "../support/Pages/loginPage";
import { ProductsPage } from "../support/Pages/productsPage";
import { ShoppingCartPage } from "../support/Pages/shoppingCartPage";
import { CheckoutPage } from "../support/Pages/checkoutPage";
import { ReciptPage } from "../support/Pages/reciptPage";

describe('Entrega final', () => {
    let token;
    let products;
    let checkout;
    const baseUrl = 'https://pushing-it.onrender.com';
    const loginPage = new LoginPage();
    const productsPage = new ProductsPage();
    const shoppingCartPage = new ShoppingCartPage();
    const checkoutPage = new CheckoutPage();
    const reciptPage = new ReciptPage();

    before(() => {
        cy.fixture('products.json').then((data) => {
            products = data;
        });

        cy.fixture('checkout.json').then((check) => {
            checkout = check;
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
                gender: 'Male',
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
        shoppingCartPage.getTotalPriceProduct(products.producto1.price, products.producto1.quantity).should('include.text', products.producto1.price * products.producto1.quantity)
        shoppingCartPage.getTotalPriceProduct(products.producto2.price, products.producto2.quantity).should('include.text', products.producto2.price * products.producto2.quantity)

        // //Verificar precio total
        shoppingCartPage.showTotalPrice().click();
        shoppingCartPage.totalAmmount().should('include.text', '52.95');

        //Ingresar al checkout y completar datos del form
        shoppingCartPage.goToCheckout();
        checkoutPage.completeForm(checkout.firstName, checkout.lastName, checkout.cardNumber);
        //Realizar compra
        checkoutPage.goToPurchase();
        //Verificar recibo de compra
        reciptPage.getNameRecipt().should('include.text', checkout.firstName).and('include.text', checkout.lastName);
        reciptPage.getNumberCard().should('include.text', checkout.cardNumber);
        reciptPage.getReciptProduct(products.producto1.name).should('include.text', products.producto1.name);
        reciptPage.getReciptProduct(products.producto2.name).should('include.text', products.producto2.name)
        reciptPage.getMoneySpent().should('include.text', checkout.totalCost);

    });

    //Enviar una petición HTTP que elimine al nuevo usuario
    after(() => {
        let user;

        user = window.localStorage.getItem('username');
        cy.request({
            method: "DELETE",
            url: `${baseUrl}/api/deleteuser/${user}`
        }).then(response => {
            cy.log(response);
            expect(response.status).to.be.equal(202);
        });
        //Verificar que el usuario haya sido eliminado correctamente
        cy.request({
            method: "GET",
            url: `${baseUrl}/api/user/${user}`, failOnStatusCode: false
        }).then(response => {
            cy.log(response);
            expect(response.status).to.be.equal(404);
        });
    })
})
