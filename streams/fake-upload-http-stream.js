import { Readable } from 'node:stream';

class OneToHundred extends Readable {
    data = 1

    _read(){
        setTimeout(() => {
            const i = this.data++

            if(i < 100){
                this.push(String(i))
            }else{
                this.push(null)
            }

        }, 1000)
    }

}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new OneToHundred()
})
