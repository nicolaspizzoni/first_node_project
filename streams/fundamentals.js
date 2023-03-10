//Stream => obter/ler pequenas partes de dados e já conseguir trabalhar com eles mesmo sem receber o todo, o Node permite isso de maneira simples e performática

//Exemplo: Importação de clientes via csv (excel)
//Mesmo que durante o upload recebeu apenas 10mb de um arquivo de 1gb, já começa a salvar os dados presentes nesse 10mb enquanto vai lendo o restante do arquivo


//stdin é uma das maneiras de leitura(readable) de dados do node stream, e o stdout uma das saidas (escrita/writable)
//pipe lê uma stream aos poucos
// process.stdin
//     .pipe(process.stdout)

import { Readable, Writable, Transform } from 'node:stream'

class OneToHundredStream extends Readable {
    index = 1

    _read(){
        setTimeout(() => {
            //simula a inserção de dados no terminal para a stream ler
            const i = this.index++

            if(i < 100){

                //this.push é o valor que está sendo lido e que será passado pelo pipe para a stream de saida
                this.push(String(i))
            }else{
                this.push(null)
            }
        }, 1000)
    }
}

//Stream de transformação ela lê os dados de uma stream, por isso é capaz de transforma-los, e depois pode passar os dados para outra stream, como um itermedio, diferente da Writable que não passa os dados para frente
class ToNegativeNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const negative = Number(chunk.toString()) * -1

        callback(null, String(negative))
    }
}


//Stream de escrita serve para processar dados, e é o ponto final, pois não passa esses dados para nenhuma outra stream
class MultipleByTenStream extends Writable {
    //chunk é o retorno da stream de leitura, passado no this.push da mesma
    //encoding como o retorno/informação está codificada
    //callback é a função que a stream de escrita precisa chamar quando ela terminar de processar a informação
    _write(chunk, encoding, callback){
        console.log(Number(chunk.toString()) * 10)

        callback()
    }
}

//instanciando e usando o pipe para ler a stream de entrada e conectar ao processo de saida stdout, passando o valor entre as streams
new OneToHundredStream()
// .pipe(process.stdout)
.pipe(new ToNegativeNumberStream())
.pipe(new MultipleByTenStream())