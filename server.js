const server = require('ws').Server;
let s = new server({ port: '5001' });       // connect to the same port as of client


s.on('connection', (ws) => {
    // func which will run when it will get a message from client
    ws.on('message', (message) => {
        message = JSON.parse(message);

        if (message.type === 'name') {
            ws.personName = message.data;
            return;
        }

        // sending one client message to every client
        s.clients.forEach((client) => {
            if (client !== ws) {
                // client.send(message + "");                          // to send the data as string atleast add an empty string otherwise blob will occur
                client.send(JSON.stringify({
                    name: ws.personName,
                    data: message.data
                }))
            }
        })
    })

    // func which run when server loose a client
    ws.on('close', () => {
        console.log('I lost a client');
    })
})