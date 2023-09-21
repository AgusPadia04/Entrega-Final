export class Checkout{
    constructor(){
        this.fName = '#FirstName';
        this.lName = '#lastName';
        this.cardNumber = '#cardNumber';
    }

    escribirFirsName(fName){
        cy.get(this.fName).type(fName);
    }
    escribirLastName(lName){
        cy.get(this.lName).type(lName);
    }
    escribirCardNumber(cNumber){
        cy.get(this.cardNumber).type(cNumber);
    }
}