async function InitLocalTournament(event) {
    localStorage.setItem('isTournament', 'true');
    
    localStorage.setItem('playerAName', document.getElementById('usernamePlayer1').value);
    localStorage.setItem('playerBName', document.getElementById('usernamePlayer2').value);
    localStorage.setItem('playerCName', document.getElementById('usernamePlayer3').value);
    localStorage.setItem('playerDName', document.getElementById('usernamePlayer4').value);
    localStorage.setItem('playerEName', document.getElementById('usernamePlayer5').value);
    localStorage.setItem('playerFName', document.getElementById('usernamePlayer6').value);
    localStorage.setItem('playerGName', document.getElementById('usernamePlayer7').value);
    localStorage.setItem('playerHName', document.getElementById('usernamePlayer8').value);

    localStorage.setItem('gameAScore', [0, 0, 0, 0]);
    localStorage.setItem('gameBScore', [0, 0, 0, 0]);
    localStorage.setItem('gameCScore', [0, 0, 0, 0]);
    localStorage.setItem('gameDScore', [0, 0, 0, 0]);
    localStorage.setItem('gameEScore', [0, 0, 0, 0]);
    localStorage.setItem('gameFScore', [0, 0, 0, 0]);
    localStorage.setItem('gameGScore', [0, 0, 0, 0]);
    
    const navigate = new CustomEvent('navigate', { detail: { path: '/waiting-room-tournament' } });
    document.dispatchEvent(navigate);
}