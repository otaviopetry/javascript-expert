import { write } from 'fs';
import { Duplex, Transform } from 'stream';

let count = 0;

const server = new Duplex({
    objectMode: true, // trabalha com string em vez de buffer => gasta mais memória
    encoding: 'utf-8',
    read() {
        const everySecond = (intervalContext) => {
            if (count++ <= 5) {
                this.push(`Item ${count}\n`);

                return;
            }

            clearInterval(intervalContext);
            this.push(null);
        }

        setInterval(function () { 
            everySecond(this);
        }, 1000);
    },
    write(chunk, encoding, callback) {
        console.log('[writable] saving', chunk);
        callback();
    }
})

// provar que são canais de comunicação diferentes
// write aciona o writable do Duplex
server.write('[duplex] - This is a writable\n');

// on data -> loga o que foi enviado pelo readable
// server.on('data', (msg) => {
//     console.log(`[readable]${msg}`)
// });

// o push deixa enviar mais dados
server.push(`[duplex] - This is also a readable\n`)

// server.pipe(process.stdout);

const transformToUpperCase = Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        callback(null, chunk.toUpperCase());
    }
})

// o push vai ignorar o transform, o write não
transformToUpperCase.write('[transform] - hello from write!');
transformToUpperCase.push('[transform] - hello from push!\n');

server
    .pipe(transformToUpperCase)
    .pipe(server);