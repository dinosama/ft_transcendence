from back.modules.game.game_model      import Game
from back.modules.game.game_serializer import GameSerializer
from rest_framework.viewsets           import ModelViewSet
from                       django.conf import settings
from                  django.db.models import Q
from         rest_framework.exceptions import AuthenticationFailed
from           rest_framework.response import Response
from back.modules.user.user_model      import User
from back.modules.stat.stat_model      import Stat
from                    rest_framework import status

import jwt

class GameViewSet(ModelViewSet):
    serializer_class = GameSerializer

    def create(self, request):
        playerA = request.data['playerA']
        playerB = request.data['playerB']
        scoreA = request.data['scoreA']
        scoreB = request.data['scoreB']

        playerAObject = User.objects.filter(username=playerA).first()
        playerBObject = User.objects.filter(username=playerB).first()

        print(playerAObject.id)
        playerA_stat = Stat.objects.filter(user=playerAObject).first()
        playerB_stat = Stat.objects.filter(user=playerBObject).first()

        playerA_stat.gamePlayed += 1
        playerB_stat.gamePlayed += 1

        if scoreA > scoreB:
            winer = playerAObject
            winer_score = scoreA
            looser_score = scoreB
            playerA_stat.gameWin += 1
            playerB_stat.gameLost += 1
        else:
            winer = playerBObject
            winer_score = scoreB
            looser_score = scoreA
            playerB_stat.gameWin += 1
            playerA_stat.gameLost += 1

        Game.objects.create(winerScore=winer_score,
                            loserScore=looser_score,
                            player1=playerAObject,
                            player2=playerBObject,
                            winner=winer)
        
        playerA_stat.save()
        playerB_stat.save()

        return Response({"success": "game created"}, status=status.HTTP_201_CREATED)

    def list(self, request):
        try:
            user_id = jwt.decode(
                    self.request.COOKIES.get("access_token"),
                    settings.SECRET_KEY,
                    algorithms=["HS256"]
                )["user_id"]
        except:
            raise AuthenticationFailed("Invalid token")
        
        username = request.query_params.get('username', None)
        if username is not None:
            try:
                user = User.objects.get(username=username)
                if (user.id == user_id):
                    return Game.objects.filter(
                    Q(player1=user) | Q(player2=user)
                )
                
                games = Game.objects.filter(
                    Q(player1=user) | Q(player2=user)
                )
                serializer = self.get_serializer(games, many=True)
                return Response(serializer.data)
        
            except User.DoesNotExist:
                return Response({"error": "Games not found"}, status=404)
        else:
            try:
                games = Game.objects.filter(
                    Q(player1=user_id) | Q(player2=user_id)
                )

                serializer = self.get_serializer(games, many=True)
                return Response(serializer.data)
            
            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed("Token expired")
            except jwt.InvalidTokenError:
                raise AuthenticationFailed("Invalid token")
            except KeyError:
                raise AuthenticationFailed("User ID not found in token")
    