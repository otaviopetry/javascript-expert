import { Readable, Writable, Transform } from 'stream';
import { createWriteStream } from 'fs';

// fonte de dados
const readable = Readable({
    read() {
        for (let index = 1; index <= 1e6; index++) {
            const person = { id: Date.now() + index, name: `Otavio-${index}` };
            const data = JSON.stringify(person);

            this.push(data);
        }
        
        this.push(null);
    }
})

// processamento dos dados
const mapFields = Transform({
    transform(chunk, encoding, callback) {
        const data = JSON.parse(chunk);
        const result = `${data.id}: ${data.name.toUpperCase()}\n`;

        callback(null, result);
    }
})

const mapHeaders = Transform({
    transform(chunk, encoding, callback) {
        this.counter = this.counter ?? 0;

        if (this.counter) {
            return callback(null, chunk);
        }

        this.counter += 1;

        callback(null, "id,name\n".concat(chunk));
    }
})

// saída de dados
const writable = Writable({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());

        callback();
    }
})

const pipeline = readable
    .pipe(mapFields)
    .pipe(mapHeaders)
    // .pipe(writable)
    // .pipe(process.stdout)
    .pipe(createWriteStream('my.csv'))


pipeline
    .on('finish', () => { console.log('Os dados foram processados.') });