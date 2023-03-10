//require('http') possuí várias funções para criação de aplicações http/api
//CommonJS => padrão de importação utilizando o require (NÃO MAIS UTILIZADO)
//const http = require('http')

//ESModules => padrão de importação e exportação utilizando import e export (NODE NÃO ENTENDE POR PADRÃO)
//node:_modulo indica um modulo interno NODE
import http from 'node:http'

//Cabeçalhos (Requisição/Resposta) => Metadados, informa qual tipo de dado está sendo recebido e retornado tanto para frontend quanto backend respectivamente

//StateFull
const user = []

const server = http.createServer((request, response) => {
    const {method, url} = request

    console.log(method, url)

    if(method === 'GET' && url === '/users'){
        return response
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(user))
    }

    if(method === 'POST' && url === '/users') {
        user.push({
            id: 1,
            name: 'John Doe',
            email: 'johndoe@example.com',
        })

        //writeHeade retorna o status code do http
        return response.writeHead(201).end()
    }

    return response.writeHead(404).end("Not found")
})

server.listen(3333)