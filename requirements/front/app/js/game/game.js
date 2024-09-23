
function mainGame() {
		const canvas = document.getElementById('game');
		const ctx = canvas.getContext('2d');

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.fillRect(0, 0, canvas.width, canvas.height);

		const ball = 10;
		let x = canvas.width / 2;
		let y = canvas.height - 30;
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

		document.addEventListener('keydown', keyHandler);
		document.addEventListener('keyup', keyHandler);

		function keyHandler(e) {
			if (e.key === 'w'){
				up_left = e.type === 'keydown';
			} else if (e.key === 's'){
				down_left = e.type === 'keydown';
			}

			if (e.key === 'ArrowUp'){
				up_right = e.type === 'keydown';
			} else if (e.key === 'ArrowDown'){
				down_right = e.type === 'keydown';
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
			const textY = 30;
			ctx.fillText(scoreText, textX, textY);
		}
		

		function draw() {
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		
			drawBall();
			drawPaddle(0, paddleYLeft);
			drawPaddle(canvas.width - paddleHeight, paddleYRight);
			drawScore();
		
			if (x + dx > canvas.width - ball) {
				// right wall collision
				if (y + dy > paddleYRight && y + dy < paddleYRight + paddleWidth) {
					dx = -dx; // Ball bounce
				} else {
					score_left++;
					if (score_left === 3) {
						gameOver();
						return;
					}
					resetBall();
				}
			} else if (x + dx < ball) {
				// left wall collision
				if (y + dy > paddleYLeft && y + dy < paddleYLeft + paddleWidth) {
					dx = -dx;
				} else {
					score_right++;
					if (score_right === 3) {
						gameOver();
						return;
					}
					resetBall();
				}
			}
		
			if (y + dy < ball || y + dy > canvas.height - ball) {
				dy = -dy;
			}
		
			if (up_left && paddleYLeft > 0) {
				paddleYLeft -= 7;
			} else if (down_left && paddleYLeft < canvas.height - paddleWidth) {
				paddleYLeft += 7;
			}
		
			if (up_right && paddleYRight > 0) {
				paddleYRight -= 7;
			} else if (down_right && paddleYRight < canvas.height - paddleWidth) {
				paddleYRight += 7;
			}
		
			x += dx;
			y += dy;
		
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

		function gameOver() {
			if (localStorage.getItem('isTournament') === "true") {
				const playerArray = [
					localStorage.getItem('playerAName'),
					localStorage.getItem('playerBName'),
					localStorage.getItem('playerCName'),
					localStorage.getItem('playerDName'),
					localStorage.getItem('playerEName'),
					localStorage.getItem('playerFName'),
					localStorage.getItem('playerGName'),
					localStorage.getItem('playerHName'),
				]

				const gameArray = [
					localStorage.getItem('gameAScore'),
					localStorage.getItem('gameBScore'),
					localStorage.getItem('gameCScore'),
					localStorage.getItem('gameDScore'),
					localStorage.getItem('gameEScore'),
					localStorage.getItem('gameFScore'),
					localStorage.getItem('gameGScore'),
				]

				const getGameWinner = (game) => {
					if (game[4] > game[6])
						return (playerArray[game[0]]);
					return (playerArray[game[2]]);
				}

				const currentGameIndex = gameArray.findIndex((game) => parseInt(game[4]) === 0 && parseInt(game[6]) === 0)
				switch (currentGameIndex) {
					case 0:
						localStorage.setItem('gameAScore', [
							parseInt(localStorage.getItem('currentPlayerA')), parseInt(localStorage.getItem('currentPlayerB')), score_left, score_right
						])
						break;
					case 1:
						localStorage.setItem('gameBScore', [
							parseInt(localStorage.getItem('currentPlayerA')), parseInt(localStorage.getItem('currentPlayerB')), score_left, score_right
						])
						break;
					case 2:
						localStorage.setItem('gameCScore', [
							parseInt(localStorage.getItem('currentPlayerA')), parseInt(localStorage.getItem('currentPlayerB')), score_left, score_right
						])
						break;
					case 3:
						localStorage.setItem('gameDScore', [
							parseInt(localStorage.getItem('currentPlayerA')), parseInt(localStorage.getItem('currentPlayerB')), score_left, score_right
						])
						break;
					case 4:
						localStorage.setItem('gameEScore', [
							parseInt(localStorage.getItem('currentPlayerA')), parseInt(localStorage.getItem('currentPlayerB')), score_left, score_right
						])
						break;
					case 5:
						localStorage.setItem('gameFScore', [
							parseInt(localStorage.getItem('currentPlayerA')), parseInt(localStorage.getItem('currentPlayerB')), score_left, score_right
						]);
						break;
					case 6:
						localStorage.setItem('gameGScore', [
							parseInt(localStorage.getItem('currentPlayerA')), parseInt(localStorage.getItem('currentPlayerB')), score_left, score_right
						])
						const winner = getGameWinner(localStorage.getItem('gameGScore'));
						const playerA = playerArray[localStorage.getItem('gameGScore')[0]];
						const playerB = playerArray[localStorage.getItem('gameGScore')[2]];
						const scoreA = localStorage.getItem('gameGScore')[4];
						const scoreB = localStorage.getItem('gameGScore')[6];
							
						localStorage.removeItem('currentPlayerA');
						localStorage.removeItem('currentPlayerB');
						localStorage.removeItem('isTournament');
						
						localStorage.removeItem('playerAName');
						localStorage.removeItem('playerBName');
						localStorage.removeItem('playerCName');
						localStorage.removeItem('playerDName');
						localStorage.removeItem('playerEName');
						localStorage.removeItem('playerFName');
						localStorage.removeItem('playerGName');
						localStorage.removeItem('playerHName');

						localStorage.removeItem('gameAScore');
						localStorage.removeItem('gameBScore');
						localStorage.removeItem('gameCScore');
						localStorage.removeItem('gameDScore');
						localStorage.removeItem('gameEScore');
						localStorage.removeItem('gameFScore');
						localStorage.removeItem('gameGScore');

						const navigate = new CustomEvent('navigate', { detail: { path: `/game-winner-tournament?winner=${winner}&playerA=${playerA}&playerB=${playerB}&scoreA=${scoreA}&scoreB=${scoreB}`}});
						document.dispatchEvent(navigate);
						return;
				}

				const navigate = new CustomEvent('navigate', { detail: { path: `/game-score-tournament?win=${maxNum()}&loose=${minNum()}` } });
				document.dispatchEvent(navigate);
			
			} else {
				const navigate = new CustomEvent('navigate', { detail: { path: `/game-score?win=${maxNum()}&loose=${minNum()}` } });
				document.dispatchEvent(navigate);
			}
		}
		draw();
	}
	mainGame();