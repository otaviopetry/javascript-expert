
import timers from 'timers/promises'
const timeoutAsync = timers.setTimeout;

// const results = ['1', '2'].map(async (item) => {
//     console.log('Starting process!');
//     await timeoutAsync(100);
//     console.log(item);
//     console.log(await Promise.resolve('Timeout order!'));
//     await timeoutAsync(100);
//     console.count('debug');

//     return parseInt(item) * 2;
// })

// console.log('results', await Promise.all(results));

setTimeout(async () => {
    console.log('Starting process!');
    await timeoutAsync(100);
    console.count('debug');
    console.log(await Promise.resolve('timeout order!'));
    await timeoutAsync(100);
    console.count('debug');

    await Promise.reject('Promise rejected on timeout!');
}, 1000);

const throwError = (message) => { throw new Error(message); }

try {
    console.log('Hello');
    console.log('world');
    throwError('Error inside try/catch');
} catch(error) {
    console.log('Catched error', error.message);
} finally {
    console.log('Executed after all')
}

process.on('unhandledRejection', (error) => {
    console.log('unhandledRejection', error.message || error);
});
process.on('uncaughtException', (error) => {
    console.log('uncaughtException', error.message || error);
})
Promise.reject('La promessa quebrada');


// se o Promise.reject estiver dentro de um outro contexto, ele cai no unhandledRejection
setTimeout(async () => {
    await Promise.reject('promise async/await rejected');
})

// mas se ele estiver no contexto global, ele cai no uncaughtException
await Promise.reject('La promessa quebrada');



