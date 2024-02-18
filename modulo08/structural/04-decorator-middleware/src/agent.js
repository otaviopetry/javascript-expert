import Http from 'http';

async function InjectHttpInterceptor() {
    const oldEmit = Http.Server.prototype.emit;

    Http.Server.prototype.emit = function (...args) {
        const [type, request, response] = args;

        if (type === 'request') {
            response.setHeader('X-Instrumented-By', 'OtavioPetry');
            response.setHeader('X-Spell', 'Parangarico tirimirruaro');
        }

        return oldEmit.apply(this, args);
    }
}

export {
    InjectHttpInterceptor
};