// import http module to enable you create a new server
import http from 'http' 

// create a new server and store in a variable
const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Welcome to my e-library server!')
})

// set a port for the server to listen on
const PORT = 5000
const PORT_NUMBER = '127.0.0.1'
server.listen(PORT, PORT_NUMBER, () => {
    console.log(`Server is running at http://${PORT_NUMBER }:${PORT}/`)
})

