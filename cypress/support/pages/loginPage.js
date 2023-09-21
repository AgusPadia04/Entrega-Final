export class LoginPage{
    constructor(){
        this.user = '#user';
        this.pass = '#pass';
        this.submitForm = '#submitForm';
    }
    escribirUsuario(usuario){
        cy.get(this.user).type(usuario);
    }
    escribirContraseña(contraseña){
        cy.get(this.pass).type(contraseña);
    }
    clickLoginButton(){
        cy.get(this.submitForm).click();
    }
}