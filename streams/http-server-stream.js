import http from 'node:http'
import { Transform } from 'node:stream';

class ToNegativeNumberStream extends Transform {
    _transform(chunk, encoding, callback){
        const negative = Number(chunk.toString()) * -1

        console.log(negative)

        callback(null, String(negative))
    }
}

//req => Readable Stream
//res => Writable Stream

const server = http.createServer((req, res) => {
    return req
    .pipe(new ToNegativeNumberStream)
    .pipe(res)
})

server.listen(3334)