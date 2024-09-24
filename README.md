<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/dinosama/ft_transcendence](https://github.com/dinosama/ft_transcendence">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">ft_transcendence</h3>

  <p align="center">
    ft_transcendence is the 42 last common core project, the goal is to develop a fullstack on page website integrating a multiplayer pong game with social and some extra module like games history saved on blockchain, gameserver and more.

  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

![Product Name Screen Shot]([https://github.com/dinosama/ft_transcendence](https://private-user-images.githubusercontent.com/42315874/370106232-1cf8b747-91cd-4412-8a09-b12cfaf90ac9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjcxNDUxNTQsIm5iZiI6MTcyNzE0NDg1NCwicGF0aCI6Ii80MjMxNTg3NC8zNzAxMDYyMzItMWNmOGI3NDctOTFjZC00NDEyLThhMDktYjEyY2ZhZjkwYWM5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MjQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTI0VDAyMjczNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTZiZWE4NDkzNTVkZGE3MGM2OGVkMTliNDI4N2M3ODg2OTNlYjI4MTU5NzkzZDMxOGFlMWYxNjVjZjI0YzFlMzMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.wwAmMexrSVlyc8GJkTTdC-3AzntwlybyP6u-Ao7R3tY))

This project is a website done with my team of 5 students at 42 Paris, we gived each other one main part of the project,
mine was websocket communication (like invitation notifications in real time. see [websocket server implementation](https://github.com/dinosama/ft_transcendence/blob/main/requirements/front/app/js/server.js)). Also that the game can be playable online,
resolving by creating our own game server using websocket connections (implemented using nodeJS [gameserver implementation](https://github.com/dinosama/ft_transcendence/blob/main/requirements/front/app/js/game-server.js)).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

This github contain the source files and what's necessary to run the website on your local machine,
but you need before that to have docker and npm installed on your system.

### Prerequisites

First of all install npm, nodejs and docker.
* npm
  [install npm and nodejs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
* docker
  [install docker](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04)
  [install dockercompose](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04)
  
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/dinosama/ft_transcendence.git
   ```
2. Install NPM packages
   ```sh
   npm install requirements/front/app
   ```
3. Run the Makefile and let docker build up the project
   ```
   sudo make
   ```
4. Wait until docker stop building up the containers then connect on your browser to http://localhost:9007/

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
![welcome screen](https://private-user-images.githubusercontent.com/42315874/370103086-c80039ff-2a70-4fad-b652-10d4948a0647.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjcxNDQxMjMsIm5iZiI6MTcyNzE0MzgyMywicGF0aCI6Ii80MjMxNTg3NC8zNzAxMDMwODYtYzgwMDM5ZmYtMmE3MC00ZmFkLWI2NTItMTBkNDk0OGEwNjQ3LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MjQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTI0VDAyMTAyM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWM4NTNjNmIyMzIxYTBjOGYxNTQzMmRiNjg2NzEyYzVhNmMxODFjYWIwYWE2OTlmN2NhNTZlZjZkZDNkM2I0NTEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.ahkQ5aQejmdlUVMACCJFOu-kD2hWPPjJlcFpRrLXXV8)
![registration screen](https://private-user-images.githubusercontent.com/42315874/370103410-21090566-89b2-4bf2-8ef6-98fe6c8a51c6.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjcxNDQyMjksIm5iZiI6MTcyNzE0MzkyOSwicGF0aCI6Ii80MjMxNTg3NC8zNzAxMDM0MTAtMjEwOTA1NjYtODliMi00YmYyLThlZjYtOThmZTZjOGE1MWM2LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MjQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTI0VDAyMTIwOVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWU0YTFlNGZiMTgzN2E3NDBjMzVmYWNhOWNlYzFkZDA0YzNjNmE4OWJkMDQyOWM3OTA4MTk2MjNiMjhiM2RiZTImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.dw4nzi3J97kbjrJbUhpc6GJq9rTMeWQxglZM5CQCSug)
![login screen](https://private-user-images.githubusercontent.com/42315874/370103644-631ae881-948b-4dcf-beca-936bc9205afe.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjcxNDQyOTQsIm5iZiI6MTcyNzE0Mzk5NCwicGF0aCI6Ii80MjMxNTg3NC8zNzAxMDM2NDQtNjMxYWU4ODEtOTQ4Yi00ZGNmLWJlY2EtOTM2YmM5MjA1YWZlLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MjQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTI0VDAyMTMxNFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWVkMWVhYjNmYThmY2I4MzE5MjU2YjkxMzBiMjhkZWE2NGY4N2YxNTZmMDFkYTFkNjc3NDI5YzlhNjc2MDlmNWYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.mBS7fVl5ck6Msu9TOVJYmFi922d5tFVQx17tENa6ocI)
![dashboard](https://private-user-images.githubusercontent.com/42315874/370103775-153f258f-d03c-4e39-9be1-1df61d25e018.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjcxNDQzNDMsIm5iZiI6MTcyNzE0NDA0MywicGF0aCI6Ii80MjMxNTg3NC8zNzAxMDM3NzUtMTUzZjI1OGYtZDAzYy00ZTM5LTliZTEtMWRmNjFkMjVlMDE4LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MjQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTI0VDAyMTQwM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTgwMDczZjQyZjdiOTY1MmZkNzdhODdlMTJmMjA5YTlhYjVkZmM4ODYwNjJmMTJhZWZjNjFhNWQ3YTc1MTJhOWQmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.FNE2n4dhNUJY6zF9YG8VONITh8zCkVOEj4ASidoS318)
![settings](https://private-user-images.githubusercontent.com/42315874/370103914-728b3905-f763-4367-89f8-b450a0f9702d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjcxNDQzODUsIm5iZiI6MTcyNzE0NDA4NSwicGF0aCI6Ii80MjMxNTg3NC8zNzAxMDM5MTQtNzI4YjM5MDUtZjc2My00MzY3LTg5ZjgtYjQ1MGEwZjk3MDJkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA5MjQlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwOTI0VDAyMTQ0NVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBjNWVkZTI0OGRhODA1M2ZkNGU2NjkwODRjZjVhMjVlNGZhZjUzYWIxZTBiZjI1OTNmNzgwYjM2MGJhZGMwZDYmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.pzzbR6tFrxjSM2LK2ccG8kyh0rGwMxjUs_UXbXZj-Dw)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

GENERAL - TO DO

FRONT
- Game
- Dashboard
- Pre-game : 
- tournoi: (1) rentrer les noms de chaque joueur, (2) aperçu des matchs
- local: username vs username
- Language support 

BACK
- database
- Live Communication/Remote players 
- Score in blockchain
- Browser compatibility 
- Notifications (friends request, game invites, online status): websockets
- websocket server
- game server
- Tournament logic: 4 games - 8 joueurs, 3 étapes 


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Top contributors:

<a href="https://github.com/dinosama/ft_transcendence/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=dinosama/ft_transcendence" alt="contrib.rocks image" />
</a>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Aaron APATOUT - [@dinosama654](https://twitter.com/dinosama654) - apatoutaaron.apatout@gmail.com

Project Link: [https://github.com/dinosama/ft_transcendence](https://github.com/dinosama/ft_transcendence)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/dinosama/ft_transcendence.svg?style=for-the-badge
[contributors-url]: https://github.com/dinosama/ft_transcendence/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/dinosama/ft_transcendence.svg?style=for-the-badge
[forks-url]: https://github.com/dinosama/ft_transcendence/network/members
[stars-shield]: https://img.shields.io/github/stars/dinosama/ft_transcendence.svg?style=for-the-badge
[stars-url]: https://github.com/dinosama/ft_transcendence/stargazers
[issues-shield]: https://img.shields.io/github/issues/dinosama/ft_transcendence.svg?style=for-the-badge
[issues-url]: https://github.com/dinosama/ft_transcendence/issues
[license-shield]: https://img.shields.io/github/license/dinosama/ft_transcendence.svg?style=for-the-badge
[license-url]: https://github.com/dinosama/ft_transcendence/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/aaron-apatout
[product-screenshot]: images/screenshot.png

[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
