import http from 'node:http';
import * as fs from 'node:fs';

const host = 'localhost';
const port = 8080;

const server = http.createServer((req, res) => {
    const myURL = new URL(req.url, `http://${host}:${port}/`);
    let fileName = '';
    if (myURL.pathname === '/' || myURL.pathname === '/index') {
        fileName = 'index';
    } else {
        fileName = myURL.pathname;
    }

    fs.readFile(`./${fileName}.html`, (error, data) => {

        if (error) {
            res.writeHead(404, {"Content-Type": "text/html"});
            res.write(
                fs.readFileSync('./404.html', (error, data) => {
                    if (error) throw (error);
                    return data;
                })
            );
            return res.end();
        } else {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            return res.end();
        }
    });
})

server.listen(port, host, ()=> {
    console.log(`Server running at http://${host}:${port}/`);
});