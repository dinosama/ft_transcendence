async function getFriend() {
    const http_adapter = new HttpAdapter('http://localhost:9009/api/friend/');
    try {
        const json = await http_adapter.fetchByCookie();
        return json;
    } catch (error) {
        console.error('Error:', error);
    }
}

function getState(username, friend)
{
    let state = "Offline";
    const ws = new WebSocket(`ws://localhost:9010?id=${username}ping`);

    return new Promise(function (resolve, reject) {
    ws.addEventListener("message", function (event) {
        const recv = JSON.parse(event.data);

        switch (recv.command) {
            case "pong":
                resolve("Online");
            break;
            case "offline":
                resolve("Offline");
            break;
        }
    });
    const msg = {
        user: `${friend}`,
        command: "ping"
    };
    ws.onopen = () => ws.send(JSON.stringify(msg));
});

}