let sock = new WebSocket('ws://localhost:5001');        // connecting client and server on same port
let log = document.getElementById('log');

// taking client for identifying individualy
let ClientName = prompt('あなたの名前を書いてください');

sock.onopen = () => {
    sock.send(JSON.stringify({
        type: 'name',
        data: ClientName
    }))
}

// func which will run when server send some data back to client(us)
sock.onmessage = (e) => {
    let json = JSON.parse(e.data);
    log.innerHTML += json.name + ": " + json.data + "<br>";
}


document.querySelector('button').onclick = () => {
    let text = document.getElementById('text').value;
    sock.send(JSON.stringify({
        type: 'message',
        data: text
    }));
    log.innerHTML += "You: " + text + "<br>";
}