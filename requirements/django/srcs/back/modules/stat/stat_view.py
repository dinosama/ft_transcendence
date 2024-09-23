from             back.modules.stat.stat_model import Stat
from             back.modules.user.user_model import User
from        back.modules.stat.stat_serializer import StatSerializer
from back.modules.friendship.friendship_model import Friendship
from                  rest_framework.viewsets import ModelViewSet
from                              django.conf import settings
from                  rest_framework.response import Response
from                rest_framework.exceptions import AuthenticationFailed
from                         django.db.models import Q


import jwt

class StatViewSet(ModelViewSet):
    serializer_class = StatSerializer

    def list(self, request):
        username = request.query_params.get('username', None)

        if username is not None:

            try:
                user = User.objects.get(username=username)
                user_id = jwt.decode(
                        self.request.COOKIES.get("access_token"),
                        settings.SECRET_KEY,
                        algorithms=["HS256"]
                    )["user_id"]
                
                friendships = Friendship.objects.filter(
                    (Q(sender=user_id) | Q(receiver=user_id)) & Q(isAccepted=True)
                )
                
                if len(friendships) == 0:
                    return Response({"error": "User is not your friend"}, status=401)

                stats = Stat.objects.filter(user=user)
                serializer = self.get_serializer(stats, many=True)
                return Response(serializer.data)
            except User.DoesNotExist:
                return Response({"error": "Stats not found"}, status=404)
        else:
            try:
                stats = Stat.objects.filter(
                    user=jwt.decode(
                        self.request.COOKIES.get("access_token"),
                        settings.SECRET_KEY,
                        algorithms=["HS256"]
                    )["user_id"]
                )
                serializer = self.get_serializer(stats, many=True)
                return Response(serializer.data)

            except jwt.ExpiredSignatureError:
                raise AuthenticationFailed("Token expired")
            except jwt.InvalidTokenError:
                raise AuthenticationFailed("Invalid token")
            except KeyError:
                raise AuthenticationFailed("User ID not found in token")

