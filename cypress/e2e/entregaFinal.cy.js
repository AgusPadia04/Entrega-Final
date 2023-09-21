import { ProductPage } from '../support/pages/productPage';
import { ShoppingCartPage } from '../support/pages/shoppingCartPage';
import { Checkout } from '../support/pages/checkOut';
import { Recipt } from '../support/pages/recipt';
import { Home } from '../support/pages/home';

describe('Entrega Final', ()=>{
    const shoppingCartPage = new ShoppingCartPage;
    const productPage = new ProductPage;
    const checkout = new Checkout;
    const recipt = new Recipt;
    const home = new Home;
    let datosProductos;
    let datosCheckout;
    
    before(()=>{
        cy.fixture('productos').then(data =>{datosProductos = data;})
        cy.fixture('checkout').then(data =>{datosCheckout = data;})
    })
    beforeEach(()=>{
        cy.request({
            url: "https://pushing-it.onrender.com/api/register",
            method: "POST",
            body:{
                username : home.username,
                password: home.password,
                gender: home.gender,
                day: home.day,
                month: home.month,
                year: home.year,
            }
        }).then(respuesta =>{
            expect(respuesta.status).to.be.equal(200);
            expect(respuesta.body.newUser.username).to.be.equal(home.username)
            expect(respuesta.body.newUser.gender).to.be.equal(home.gender);
            expect(respuesta.body.newUser.day).to.be.equal(home.day);
            expect(respuesta.body.newUser.month).to.be.equal(home.month);
            expect(respuesta.body.newUser.year).to.be.equal(home.year);
        })
        cy.request({
            url:"https://pushing-it.onrender.com/api/login",
            method: "POST",
            body:{
                username: home.username,
                password: home.password,
            }
        }).then(respuesta =>{
            window.localStorage.setItem('token', respuesta.body.token);
            window.localStorage.setItem('user', respuesta.body.user.username )
            cy.visit(' ');
        })
    })
    it('prueba desafio 3', ()=>{
        cy.get('#onlineshoplink').click();
        productPage.agregarProducto(datosProductos.producto1.nombre);
        productPage.confirmarProducto();
        productPage.agregarProducto(datosProductos.producto2.nombre);
        productPage.confirmarProducto();
        cy.get('#goShoppingCart').click();
        shoppingCartPage.verificarNombreProducto(datosProductos.producto1.nombre).should('have.text',datosProductos.producto1.nombre);
        shoppingCartPage.verificarPrecioProducto(datosProductos.producto1.precio).should('have.text','$'+ datosProductos.producto1.precio);
        shoppingCartPage.verificarNombreProducto(datosProductos.producto2.nombre).should('have.text',datosProductos.producto2.nombre);
        shoppingCartPage.verificarPrecioProducto(datosProductos.producto2.precio).should('have.text','$'+ datosProductos.producto2.precio);
        cy.xpath('//button[text()="Show total price"]').click();
        shoppingCartPage.verificarPrecioAcumulado(datosProductos.producto1.precio + datosProductos.producto2.precio);
        cy.xpath('//button[text()="Go to Checkout"]').click();
        checkout.escribirFirsName(datosCheckout.nombre);
        checkout.escribirLastName(datosCheckout.apellido);
        checkout.escribirCardNumber(datosCheckout.cardNumber);
        cy.xpath('//button[text()="Purchase"]').click();
        cy.xpath('//button[text()="Thank you"]',{timeout:11000}).should('exist');
        recipt.verificarNombreApellido(datosCheckout.nombre + " " + datosCheckout.apellido + " " + "has succesfully purchased the following items" ).should('have.text',datosCheckout.nombre + " " + datosCheckout.apellido + " " + "has succesfully purchased the following items");
        recipt.verificarProducto(datosProductos.producto1.nombre).should('have.text',datosProductos.producto1.nombre);
        recipt.verificarProducto(datosProductos.producto2.nombre).should('have.text',datosProductos.producto2.nombre);
        recipt.verificarCreditCard(datosCheckout.cardNumber).should('have.text', datosCheckout.cardNumber);
        recipt.verificarCostoTotal(datosProductos.producto1.precio+datosProductos.producto2.precio);
    })
    after(()=>{
        cy.request({
            url:`https://pushing-it.onrender.com/api/deleteuser/${home.username}`,
            method:"DELETE",
        }).then(respuesta =>{
            expect(respuesta.status).to.be.equal(200);
        })
    })
})