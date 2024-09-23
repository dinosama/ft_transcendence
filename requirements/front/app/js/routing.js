import                   Home from '../views/home.js';
import                  Login from '../views/login.js';
import               Register from '../views/register.js';
import              Dashboard from '../views/dashboard.js';
import    TwoFaAuthentication from '../views/twoFaAuthentication.js';
import                   Game from '../views/gameview.js';
import             RemoteGame from '../views/remote-gameview.js';
import               Settings from '../views/settings.js';
import              GameScore from '../views/game-score.js';
import    GameScoreTournament from '../views/game-score-tournament.js';
import            WaitingRoom from '../views/waiting-room.js';
import      gameLocalPrematch from '../views/game-local-prematch.js';
import          PreTournament from '../views/pre-tournament.js';
import                Profile from '../views/profile.js';
import GameTournamentPrematch from '../views/game-tournament-prematch.js';
import   GameWinnerTournament from '../views/game-winner-tournament.js';
import { getLangCookie, setLangCookie, translate } from './translate.js';

let arrows = false;

// update browser history + call router to render view
export const navigateTo = (url) => {
  history.pushState(null, null, url);
  if (arrows === false) router();
};

// rebder HTML from view
const renderView = async (view) => {
  document.querySelector('#app').innerHTML = await view.getHtml();
};

// return matching route from path
const findMatchingRoute = (path, routes) => {
  return routes.find((route) => route.path === path) || routes[0];
};

const checkToken = () => {
  const cookies = document.cookie;
  if (!cookies.includes("access_token")) {
    return false;
  }
  return true;
}

// instantiate view and render HTML
const router = async () => {
  arrows = false;
  const routes = [
    { path: '/', view: Home },
    { path: '/login', view: Login },
    { path: '/register', view: Register },
    { path: '/dashboard', view: Dashboard },
    { path: '/twoFaAuthentication', view: TwoFaAuthentication },
    { path: '/game', view: Game },
    { path: '/remote-game', view: RemoteGame },
    { path: '/settings', view: Settings },
    { path: '/game-score', view: GameScore },
    { path: '/game-score-tournament', view: GameScoreTournament },
    { path: '/waiting-room', view: WaitingRoom },
    { path: '/waiting-room-local', view: gameLocalPrematch },
    { path: '/waiting-room-tournament', view: GameTournamentPrematch },
    { path: '/pre-match-tournament', view: PreTournament },
    { path: '/profile', view: Profile },
    { path: '/game-winner-tournament', view: GameWinnerTournament },
  ];

  let match;
  let view;

  if (getLangCookie() == null)
    setLangCookie("EN");
  
  if (checkToken()
    || location.pathname === "/"
    || location.pathname === "/register"
    || location.pathname === "/login"
    || location.pathname === "/twoFaAuthentication"){
    match = findMatchingRoute(location.pathname, routes);
    view = new match.view();
    
    await renderView(view);
    if (location.pathname === '/dashboard') await view.loadPages();
    if (location.pathname === '/settings') await view.loadPages();
    if (location.pathname === '/profile') await view.loadPages();
    if (location.pathname === '/game') await view.loadGame();
    if (location.pathname === '/remote-game') await view.loadRemoteGame();
    if (location.pathname === '/waiting-room') await view.loadPages();
    if (location.pathname === '/waiting-room-local') await view.countdownLocalPrematch();
    if (location.pathname === '/waiting-room-tournament') await view.countdownTournamentPrematch();
  } else if (!checkToken()){
    history.pushState(null, null, "/login");
    match = findMatchingRoute("/login", routes);
    view = new match.view();
    await renderView(view);
  }
};

// back and forward arrow navigation
window.addEventListener('popstate', () => {
  arrows = true;
  router();
});

// DOM fully loaded before adding event listener - clink on element with data-link attribute
document.addEventListener('DOMContentLoaded', () => {
	router();
	document.body.addEventListener('click', (e) => {
		if (e.target.matches('[data-link]')) {
		e.preventDefault();
		navigateTo(e.target.href);
		return;
    }
  });
});

document.addEventListener('navigate', (event) => {
  navigateTo(event.detail.path);
});
