export class LoginPage {

    clickButtonIniciarSesion() {
        return cy.get("#registertoggle");
    }

    clickButtonLogIn() {
        return cy.get('[data-cy="submitForm"]');
    };

    verifyUser() {
        return cy.xpath(`//h2[starts-with(@id,'user_pushingit')]`);
    }

    escribirUsuario(usuario) {
        cy.get('#user').type(usuario);
    };

    escribirContraseña(contraseña) {
        cy.get('#pass').type(contraseña);
    };
}