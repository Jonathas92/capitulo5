/// <reference types="cypress" />

describe('Cadastro', () => {
    it('Cadastro com sucesso', () => {
        //no teste do intercept a gente simula uma conexão ok, mesmo não tendo a validação do servidor
        cy.intercept({
            //hostname = https://api.realworld.io
            //path = /api/users
            //hostname + path https://api.realworld.io/api/users
            //method = POST

            //url completa = hostname + path
            //hostname
            //path com query params
            //path sem query params

            method: 'POST',
            path: '/api/users'


        },{
            
            statusCode: 200,
            fixture:'cadastro-com-sucesso'

            //exemplo usando body
            // body: {
            //     "user": {
            //         "email": "chapter51234893@mail.com",
            //         "username": "chapter51234893",
            //         "bio": null,
            //         "image": "https://realworld-temp-api.herokuapp.com/images/smiley-cyrus.jpeg",
            //         "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXB0ZXI1MTIzNDg5M0BtYWlsLmNvbSIsInVzZXJuYW1lIjoiY2hhcHRlcjUxMjM0ODkzIiwiYmlvIjpudWxsLCJpbWFnZSI6Imh0dHBzOi8vcmVhbHdvcmxkLXRlbXAtYXBpLmhlcm9rdWFwcC5jb20vaW1hZ2VzL3NtaWxleS1jeXJ1cy5qcGVnIiwiaWF0IjoxNjM0Njg0ODA5LCJleHAiOjE2Mzk4Njg4MDl9.6YjEIerEFXCRZe7DdY1hYiEF1JEe2tX8eKCzkDlA-RU"
            //     }
            // }

        }).as('postUsers')

        cy.visit('register')
        cy.get('[placeholder=Username]').type('TesteChapterV')
        cy.get('[placeholder=Email]').type('TestechapterV@mail.com')
        cy.get('[placeholder=Password]').type('123456')

        cy.get('button.btn-primary').click()

        cy.contains('No articles are here... yet.').should('be.visible')
    });

    it('Cadastro com usuário já existente', () => {
        cy.intercept({

            method: 'POST',
            path: '/api/users'

        },{
            
            statusCode: 422,
            fixture:'cadastro-usuario-existente'

        }).as('postUsers')

        cy.visit('register')
        cy.get('[placeholder=Username]').type('TesteChapterV')
        cy.get('[placeholder=Email]').type('TestechapterV@mail.com')
        cy.get('[placeholder=Password]').type('123456')

        cy.get('button.btn-primary').click()

        cy.contains('username has already been taken').should('be.visible')
    });

    it.only('Cadastro com email já existente', () => {
        cy.intercept({
            method: 'POST',
            path: '/api/users'
        },{
           
            statusCode: 422,
            fixture: 'cadastro-email-existente'

        }).as('postEmail')

        cy.visit('register')
        cy.get('[placeholder=Username]').type('TesteChapterV')
        cy.get('[placeholder=Email]').type('TestechapterV@mail.com')
        cy.get('[placeholder=Password]').type('123456')

        cy.get('button.btn-primary').click()

        cy.contains('email has already been taken').should('be.visible')
    });
});