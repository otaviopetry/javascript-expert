const http = require('http');

const DEFAULT_USER = {
    username: 'OtavioPetry',
    password: '123456',
};

const routes = {
    default: (request, response) => {
        response.write('Hello World!');

        return response.end();
    },
    '/contact:get': (request, response) => {        
        response.write('Contact us!');

        return response.end();
    },
    '/login:post': async (request, response) => {
        for await (const data of request) {
            const user = JSON.parse(data);

            if (
                user.username !== DEFAULT_USER.username ||
                user.password !== DEFAULT_USER.password
            ) {
                response.writeHead(401);
                response.write('Login has failed.');

                return response.end();
            }

            response.write('Login has succeeded!');

            return response.end();
        }
    },
};

const handler = function (request, response) {        
    const { url, method } = request;
    const routeKey = `${ url }:${ method.toLowerCase() }`;
    const selectedRoute = routes[routeKey] || routes.default;

    response.writeHead(200, {
        'Content-Type': 'text/html',
    });

    return selectedRoute(request, response);
}

const port = 3000;
const app = http.createServer(handler).listen(
    port,
    () => console.log(`App running at port ${ port }`),
);

module.exports = app;

