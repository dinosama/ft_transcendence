import Websocket, { WebSocketServer } from 'ws';
import url from 'url';
import redis from 'redis';
import { subscribe } from 'diagnostics_channel';

const WEB_SOCKET_PORT = 9011;

const server = new WebSocketServer({ port: WEB_SOCKET_PORT });

console.log("Game server running....");

async function manageGame(user1, user2)
{
    const redpub = redis.createClient({url: 'redis://localhost:8815'});
    const redsub = redis.createClient({url: 'redis://localhost:8815'});
    redpub.on('error', err => console.error('client error', err));
    redsub.on('error', err => console.error('client error', err));

    let x = 1200 / 2;
    let y = 500 / 2;
    let dx = 12;
    let dy = -12;
    let user1pos = 490 / 2;
    let user2pos = 490 / 2;
    let user1score = 0;
    let user2score = 0;
    let connecteduser = 0;
    let gameover = 0;
    const ball = 10;
    let tosend;

    redsub.connect();
    redpub.connect();
    redsub.subscribe(`${user1}${user2}`, (message) => {
        if (message != `${user1}${user2}`)
        {
            const recv = JSON.parse(message);

            switch (recv.command)
            {
                case "connect":
                    connecteduser = connecteduser + 1;
                case "position":
                    switch (recv.user) {
                        case `user1`:
                            user1pos = recv.pos;
                        break;
                        case `user2`:
                            user2pos = recv.pos;
                    }
            }
        }
    });
    while (!gameover)
    {
        if (connecteduser >= 2)
        {
            const tosend = {
                command: "state",
                user1pos: user1pos,
                user2pos:  user2pos,
                user1score:  user1score,
                user2score:  user2score,
                x:  x,
                y:  y,
            };
            try {
                redpub.publish(`${user1}${user2}`, JSON.stringify(tosend));
            } catch (error) {
              console.error(error);
            }

            if (x + dx > 1200 - ball) {
				if (y + dy > user2pos && y + dy < user2pos + 100) {
					dx = -dx;
                } else {
					user1score++;
					if (user1score == 3) {
						gameover = 1;
                        const tosend = {
                            command: "gameover",
                            user1score: user1score,
                            user2score: user2score,
                            user1: user1,
                            user2: user2
                        };
                        try {
                            redpub.publish(`${user1}${user2}`, JSON.stringify(tosend));
                            redsub.unsubscribe(`${user1}${user2}`);
                            redpub.quit();
                            redsub.quit();
                        } catch (error) {
                          console.error(error);
                        }
						return;
					}
                    x = 1200 / 2;
                    y = 500 / 2;
                    dx = 12;
                    dy = -12;
				}
			} else if (x + dx < ball) {
				if (y + dy > user1pos && y + dy < user1pos + 100) {
					dx = -dx;
				} else {
					user2score++;
					if (user2score == 3) {
						gameover = 1;
                        const tosend = {
                            command: "gameover",
                            user1score: user1score,
                            user2score: user2score,
                            user1: user1,
                            user2: user2
                        };
                        try {
                            redpub.publish(`${user1}${user2}`, JSON.stringify(tosend));
                            redsub.unsubscribe(`${user1}${user2}`);
                            redpub.quit();
                            redsub.quit();
                        } catch (error) {
                          console.error(error);
                        }
						return;
					}
                    x = 1200 / 2;
                    y = 500 / 2;
                    dx = 12;
                    dy = -12;
				}
			}
			if (y + dy < ball || y + dy > 500 - ball) {
				dy = -dy;
			}
            x += dx;
			y += dy;
        }
        await new Promise(resolve => setTimeout(resolve, 30));
    }
}

server.on('connection', function connection(ws, req, client) {
	ws.on('error', console.error);
	const parameters = url.parse(req.url, true);
	ws.id = parameters.query.id;
    ws.connect = 0;

	if (ws.connect == 0)
	{
		ws.redsub = redis.createClient({url: 'redis://localhost:8815'});
		ws.redpub = redis.createClient({url: 'redis://localhost:8815'});
		ws.redpub.on('error', err => console.error('client error', err));
		ws.redsub.on('error', err => console.error('client error', err));
		ws.redsub.connect();
		ws.redpub.connect();
		ws.connect == 1;
	}
	ws.addEventListener("message", function (event) {
        const recv = JSON.parse(event.data);

        switch (recv.command) {
            case "game":
                manageGame(recv.user1, recv.user2);
            break;
            case "info":
                const msg = {
                    command: "position",
                    user: recv.user,
                    pos: recv.pos,
                };
                try {
                    ws.redpub.publish(`${recv.game}`, JSON.stringify(msg));
                } catch (error) {
                  console.error(error);
                }
            break;
            case "connect":
                const tosend = { command: "connect"};
                ws.redsub.subscribe(`${recv.game}`, (message) => {
                    if (message != `${recv.game}`)
                    {
                        const recu = JSON.parse(message);
                        if (recu.command == "state")
                        {
                            ws.send(message);
                        }
                        if (recu.command ==  "gameover")
                        {
                            try {
                                ws.redsub.unsubscribe(`${recv.game}`);
								ws.redsub.quit();
								ws.redpub.quit();
                            } catch (error) {
                                console.error(error);
                            }
                            ws.send(message);
                        }
                    }
                });
                try {
                    ws.redpub.publish(`${recv.game}`, JSON.stringify(tosend));
                } catch (error) {
                  console.error(error);
                }
            break;
        }
	})
});

server.on('close', function close(ws) {

});
