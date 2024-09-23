gameover = 0;

function mainGame(player, gameover) {
	if (gameover == 1)
		return;
	const canvas = document.getElementById('game');
	const ctx = canvas.getContext('2d');
	let ws = new WebSocket(`ws://localhost:9011?id=`);

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	const ball = 10;
	let x = canvas.width / 2;
	let y = canvas.height / 2;
	let dx = 2;
	let dy = -2;

	const paddleHeight = 10;
	const paddleWidth = 75;
	let paddleYLeft = (canvas.height - paddleHeight) / 2;
	let paddleYRight = (canvas.height - paddleHeight) / 2;

	let up_left = false;
	let up_right = false;
	let down_left = false;
	let down_right = false;

	let score_left = 0;
	let score_right = 0;

	let once = 0;

	function sendMessage(msg) {
		waitForSocketConnection(ws, function() {
			ws.send(msg);
		});
	}

	function waitForSocketConnection(socket, callback) {
		setTimeout(
			function () {
				if (socket.readyState === 1) {
					if (callback != null) {
						callback();
					}
				} else {
					waitForSocketConnection(socket, callback);
				}
			},
		5);
	}

	const queryParams = new URLSearchParams(window.location.search);
	const user1 = queryParams.get('user1');
	const user2 = queryParams.get('user2');
	const is = queryParams.get('is');
	
	ws.addEventListener("message", async function (event) {
		const recv = JSON.parse(event.data);
		if (recv.command == "gameover")
		{
			score_left = recv.user1score;
			score_right = recv.user2score;
			
			if (is == '1' && gameover == 0) {
				gameover = 1;
				const http_adapter = new HttpAdapter('http://localhost:9009/api/game/');
				const json = await http_adapter.postWithCookie({
					playerA: user1,
					playerB: user2,
					scoreA: score_left,
					scoreB: score_right}
				);
			}
			ws.close();
			const navigate = new CustomEvent('navigate', { detail: { path: `/game-score?win=${maxNum()}&loose=${minNum()}` } });
			document.dispatchEvent(navigate);
			return ;
		}
		score_left = recv.user1score;
		score_right = recv.user2score;
		x = recv.x;
		y = recv.y;

		if (is == 1)
			paddleYRight = recv.user2pos;
		else
			paddleYLeft = recv.user1pos;
	});
	let isuser;

	const msg = {
		user: is,
		game: user1 + user2,
		command: "connect",
	};

	sendMessage(JSON.stringify(msg));
	document.addEventListener('keydown', keyHandler);
	document.addEventListener('keyup', keyHandler);

	function keyHandler(e) {
		if (is == 1)
		{
			if (e.key === 'w'){
				up_left = e.type === 'keydown';
			} else if (e.key === 's'){
				down_left = e.type === 'keydown';
			}

			if (e.key === 'ArrowUp'){
				up_left = e.type === 'keydown';
			} else if (e.key === 'ArrowDown'){
				down_left = e.type === 'keydown';
			}
		}
		if (is == 2)
		{
			if (e.key === 'w'){
				up_right = e.type === 'keydown';
			} else if (e.key === 's'){
				down_right = e.type === 'keydown';
			}

			if (e.key === 'ArrowUp'){
				up_right = e.type === 'keydown';
			} else if (e.key === 'ArrowDown'){
				down_right = e.type === 'keydown';
			}
		}
	}

	function drawBall() {
		ctx.beginPath();
		ctx.arc(x, y, ball, 0, Math.PI * 2);
		ctx.fillStyle = '#FF853B';
		ctx.fill();
		ctx.closePath();
	}

	function drawPaddle(x, y) {
		ctx.beginPath();
		ctx.rect(x, y, paddleHeight, paddleWidth);
		ctx.fillStyle = '#FFFFFF';
		ctx.fill();
		ctx.closePath();
	}

	function drawScore() {
		ctx.font = '32px Beautifully Delicious Sans';
		ctx.fillStyle = '#FF853B';
		const scoreText = 'Score: ' + score_left + ' - ' + score_right;
		const textWidth = ctx.measureText(scoreText).width;
		const textX = (canvas.width - textWidth) / 2;
		const textY = 50;
		ctx.fillText(scoreText, textX, textY);
	}
	

	function draw() {
		if (gameover == 1)
			return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	
		drawBall();
		drawPaddle(0, paddleYLeft);
		drawPaddle(canvas.width - paddleHeight, paddleYRight);
		drawScore();
	
		if (is == 1 && (up_left || down_left))
		{
			if (up_left && paddleYLeft > 0) {
				paddleYLeft -= 7;
			} else if (down_left && paddleYLeft < canvas.height - paddleWidth) {
				paddleYLeft += 7;
			}
			const tosend = {
				command: "info",
				user: "user1",
				pos: paddleYLeft,
				game: user1 + user2,
			}
			sendMessage(JSON.stringify(tosend));
		}
	
		if (is == 2 && (up_right || down_right))
		{
			if (up_right && paddleYRight > 0) {
				paddleYRight -= 7;
			} else if (down_right && paddleYRight < canvas.height - paddleWidth) {
				paddleYRight += 7;
			}
			const tosend = {
				command: "info",
				user: "user2",
				pos: paddleYRight,
				game: user1 + user2,
			}
			sendMessage(JSON.stringify(tosend));
		}
	
		requestAnimationFrame(draw);
	}
	
	function resetBall() {
		x = canvas.width / 2;
		y = canvas.height / 2;
		dx = 2;
		dy = -2;
	}
	
	const maxNum = () => {
		if (score_left >= score_right)
			return score_left;
		else
			return score_right;
	}

	const minNum = () => {
		if (score_left < score_right)
			return score_left;
		else
			return score_right;
	}
	draw();
}
mainGame("", gameover);