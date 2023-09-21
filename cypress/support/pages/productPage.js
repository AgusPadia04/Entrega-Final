export class ProductPage{

    agregarProducto(nombreProducto){
        cy.xpath(`//button[contains(@value,'${nombreProducto}')]`).click();
    }
    confirmarProducto(){
        cy.xpath('//footer/button').click();
    }
}