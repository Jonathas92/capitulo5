
const el = require('./elements').ELEMENTS

const articleName = 'Artigo de testes' + new Date().getTime()

class Articles {

           // fluxo de criacao do artigo
           AcessarOFormulario(){
                cy.get(el.linkNovoArtigo).click()
           }
           
        
           //criando o parâmetro articlename passando o tipo string e a data com horário. Criação do formulario
           
           preencherFormulario(){
                
    
                cy.get(el.inputTitle).type(articleName)
                cy.get(el.inputDescription).type('Descricao do artigo de testes')
                cy.get(el.inputBody).type('Corpo do texto do artigo que está sendo criado para os testes')
                cy.get(el.inputTags).type('cypress')
           }
   
           //submeter o formulario
           submeterFormulario(){
                cy.contains('button', 'Publish Article').click()
           }
           
           verificarSeOArtigoFoiCriado(){
                //verificar se o artigo foi criado.
                //validando pelo metodo contains se o nome do seu artigo foi criado via contains
                cy.contains(articleName).should('be.visible')
    
                //validando pelo metodo get se o nome do seu artigo foi criado via contains
                cy.get('h1').should('have.text', articleName)
           }
           
   

}

export default new Articles()