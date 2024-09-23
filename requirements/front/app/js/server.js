import WebSocket, { WebSocketServer } from 'ws';
import url from 'url';

const WEB_SOCKET_PORT = 9010;

const server = new WebSocketServer({ port: WEB_SOCKET_PORT });

function sendMessage(ws, msg){
	// Wait until the state of the socket is not ready and send the message when it is...
	waitForSocketConnection(ws, function(){
		ws.send(msg);
		ws.close();
	});
}
// Make the function wait until the connection is made...
function waitForSocketConnection(socket, callback){
setTimeout(
function () {
	if (socket.readyState === 1) {
		if (callback != null){
			callback();
		}
	} else {
		waitForSocketConnection(socket, callback);
	}

}, 5); // wait 5 milisecond for the connection...
}

// Register event for client connection
server.on('connection', function connection(ws, req, client) {

	ws.on('error', console.error);
	//console.log("new connection!\n")
	const parameters = url.parse(req.url, true);
	ws.id = parameters.query.id;
	//console.log("user: %s", ws.id);

	ws.on("message", function (event) {
		const recv = JSON.parse(event);
		//console.log("received: %s\n from %s", event, ws.id);
		switch (recv.command) {
			case "send invite":
				server.clients.forEach(function each(client) {
					if (client.id == recv.user) {
						//console.log("%s", client.id);
						const msg = {
							user: ws.id,
							command: "recv invite",
						};
						//console.log(`sending: ${JSON.stringify(msg)}`);
						client.send(JSON.stringify(msg));
					}
				})
				break;
			case "refuse invite":
				server.clients.forEach(function each(client) {
					if (client.id == `${recv.user1}waiting`) {
						//console.log("sending %s", client.id);
						const msg = {
							user1: recv.user1,
							user2: recv.user2,
							command: "cancel",
						};
						//console.log(`sending: ${JSON.stringify(msg)}`);
						client.send(JSON.stringify(msg));
					}
				})
				break;
			case "cancel invite":
				server.clients.forEach(function each(client) {
					if (client.id == `${recv.user}`) {
						//console.log("sending %s", client.id);
						const msg = {
							command: "cancel",
						};
						//console.log(`sending: ${JSON.stringify(msg)}`);
						client.send(JSON.stringify(msg));
					}
				})
				break;
			case "accept invite":
				//console.log("ACCEPT INV")
				const gamews = new WebSocket(`ws://gameserver:9011?id=server`);
				gamews.on('error', console.error);
				server.clients.forEach(function each(client) {
					if (client.id == `${recv.user1}waiting`) {
						//console.log("sending %s", client.id);
						const msg = {
							user1: recv.user1,
							user2: recv.user2,
							command: "game",
						};
						//console.log(`sending: ${JSON.stringify(msg)}`);
						sendMessage(gamews, JSON.stringify(msg));
						client.send(JSON.stringify(msg));
					}
				})
				break;
			case "ping":
				let ping = 0;
				server.clients.forEach(function each(client) {
					if (client.id == recv.user) {
						ping = 1;
						//console.log("sending %s", ws.id);
						const msg = {
							user: recv.user,
							command: "pong",
						};
						//console.log(`sending: ${JSON.stringify(msg)}`);
						ws.send(JSON.stringify(msg));
					}
				})
				if (ping == 0)
				{
					const msg = {
						user: recv.user,
						command: "offline",
					};
					//console.log(`sending: ${JSON.stringify(msg)}`);
					ws.send(JSON.stringify(msg));
				}
		}
	})

});

server.on('close', function close(ws) {

});