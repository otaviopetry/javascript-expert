import Http from 'http';

let count = 1;

async function handler(request, response) {
    count++;

    try {
        if (count % 2 === 0) {
            await Promise.reject('Erro dentro do handler');
        }

        for await (const data of request) {
            try {
                if (count % 2 !== 0) {
                    await Promise.reject('Erro dentro do for!');
                }
            } catch (error) {
                console.error('A request error occurred', error);
                response.writeHead(500);
                response.write(JSON.stringify({ message: 'Internal server error!' }));
                response.end();
            }
        }
    } catch (error) {
        console.error('An error occurred', error);
        response.writeHead(500);
        response.write(JSON.stringify({ message: 'Internal server error!' }));
    } finally {
        response.end();
    }
}

Http.createServer(handler)
    .listen(3000, () => {
        console.log('Server is running on port 3000')
    });