/// <reference types = "cypres"/>

describe('obter token', () => {
    it('somente o script para obter o token, o arquivo original está em articles.spec.js', () => {
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
        })
    });
});
