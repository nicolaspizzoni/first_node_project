# Diferença entre Writable e Transform Streams

- WriteableStream não consegue enviar dados para outra stream, ela só RECEBE dados e faz algo com esses dados.

### Exemplo

Você está criando uma pipeline de processamento de áudio, a ideia é:
- ler um arquivo de áudio;
- normalizar o volume do áudio, ou seja, cuidar pra não ficar nem muito alto, nem muito baixo;
- salvar novamente em um arquivo do sistema.

Utilizanando o conceito de streams logo nos vem a cabeça poder ler/escrever esse arquivo no sistema utilizando streams, dessa forma evitamos que o arquivo fique salvo em memória poupando recursos.

Se usarmos o fs.createReadStream para ler o conteúdo do arquivo estamos criando uma stream de leitura, ou seja, podemos ler os dados aos poucos e enviar pra alguma outra stream.

Se enviarmos esses dados para uma stream de escrita (WriteableStream), ela poderá receber os dados aos poucos, normalizar o áudio normalmente, mas não vai conseguir enviar os pedacinhos do áudio normalizado para outra stream porque uma WriteableStream sempre é um ponto final, não consigo encaminhar nada dali pra frente.

Se eu usar uma TransformStream, posso também ler a stream de leitura do arquivo de áudio, normalizar o volume e reencaminhar os dados processados para fora dessa stream para então usar um fs.createWriteStream para escrever o arquivo em disco com o áudio normalizado.

### Duplex vs Transform Stream

# TransformStream 
- recebe e escreve ao mesmo tempo;

# Duplex 
- recebe OU escreve individualmente, ou seja, posso usar ela pra ler mas não pra escrever.