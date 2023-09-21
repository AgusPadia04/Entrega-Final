export class ShoppingCartPage{
    constructor(){
        this.productName = 'p#productName';
        this.productPrice = 'p#productPrice';
        this.price = 'p#price'
    }

    verificarNombreProducto(nombreProducto){
       return cy.get(this.productName).contains(nombreProducto);
    }
    verificarPrecioProducto(precioProducto){
       return cy.get(this.productPrice).contains(precioProducto);
    }
    verificarPrecioAcumulado(precioTotal){
        cy.get(this.price).contains(precioTotal);
    }
}

