export class Recipt{
    constructor(){
        this.name = "#name";
        this.creditCard = "#creditCard";
        this.costoTotal = "#totalPrice";
        
    }

    verificarNombreApellido(nombre, apellido, string){
        return cy.get(this.name).contains(nombre, apellido, string);
    }
    verificarProducto(producto){
        return cy.xpath(`//p[text()="${producto}"]`).contains(producto)
    }
    verificarCreditCard(creditCard){
        return cy.get(this.creditCard).contains(creditCard)
    }
    verificarCostoTotal(costo){
        return cy.get(this.costoTotal).contains(costo)
    }

}