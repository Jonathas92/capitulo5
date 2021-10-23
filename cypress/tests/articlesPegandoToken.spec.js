/// <reference types = "cypres"/>


describe('Articles', () => {

    // HOOK -> Trechos que devem ser executados antes ou depois do teste
    beforeEach(() => {
        cy.request({
            url:'https://api.realworld.io/api/users/login',
            method: 'POST',
            body:{
                "user": {
                    "email": "TestechapterV@mail.com",
                    "password": "123456"
                }
            }
        }).then(response =>{
            //o comando abaixo irá exibir todo o response
            //console.log(response)

            // JSON Path -> navegação através de um json
            console.log(response.body.user.token)

            window.localStorage.setItem('jwtToken',response.body.user.token)
        })

        cy.visit('/')
    });
    it('Cadastro de novo artigo com sucesso', () => {

        // fluxo de criacao do artigo
        cy.get('[href*=editor]').click()

        //criando o parâmetro articlename passando o tipo string e a data com horário
        const articleName = 'Artigo de testes' + new Date().getTime()

        cy.get('[ng-model$=title]').type(articleName)
        cy.get('[ng-model$=description]').type('Descricao do artigo de testes')
        cy.get('[ng-model$=body]').type('Corpo do texto do artigo que está sendo criado para os testes')
        cy.get('[ng-model$=tagField]').type('cypress')

        cy.contains('button', 'Publish Article').click()

        //validando pelo metodo contains se o nome do seu artigo foi criado via contains
        cy.contains(articleName).should('be.visible')

        //validando pelo metodo get se o nome do seu artigo foi criado via contains
        cy.get('h1').should('have.text', articleName)
    })

});