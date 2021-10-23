/// <reference types = "cypres"/>

import articles from '../support/pages/articles'

describe('Articles', () => {

    // HOOK -> Trechos que devem ser executados antes ou depois do teste
    beforeEach(() => {

        //Arrange
        cy.login()

        cy.visit('/')
    });
    it('Cadastro de novo artigo com sucesso', () => {

        // fluxo de criacao do artigo
        articles.AcessarOFormulario()
        
        // Criação do formulario
        articles.preencherFormulario()
        //submeter o formulario
        articles.submeterFormulario()

        //verificar se o artigo foi criado.
        articles.verificarSeOArtigoFoiCriado()
    })

});
