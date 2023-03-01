//require('http') possuí várias funções para criação de aplicações http/api
//CommonJS => padrão de importação utilizando o require (NÃO MAIS UTILIZADO)
//const http = require('http')

//ESModules => padrão de importação e exportação utilizando import e export (NODE NÃO ENTENDE POR PADRÃO)
//node:_modulo indica um modulo interno NODE
import http from 'node:http'

const server = http.createServer((request, response) => {
    return response.end("Hello World 3")
})

server.listen(3333)