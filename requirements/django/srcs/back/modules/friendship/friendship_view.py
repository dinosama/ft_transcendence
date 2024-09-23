from      back.modules.friendship.friendship_model import Friendship
from                  back.modules.user.user_model import User
from back.modules.friendship.friendship_serializer import FriendshipSerializer
from rest_framework.viewsets                       import ModelViewSet
from                              django.db.models import Q
from                                   django.conf import settings
from                     rest_framework.exceptions import AuthenticationFailed
from             back.modules.user.user_serializer import UserWithFriendShipSerializer
from                       rest_framework.response import Response
from                                rest_framework import status
from                  back.modules.user.user_model import User
import jwt
from django.db.models import Value, BooleanField, Case, When
from               django.contrib.auth import authenticate

class FriendshipViewSet(ModelViewSet):
    serializer_class = FriendshipSerializer

    def get_queryset(self):
        try:
            user_id = jwt.decode(
                self.request.COOKIES.get("access_token"),
                settings.SECRET_KEY,
                algorithms=["HS256"]
            )["user_id"]
            
            friendships = Friendship.objects.filter(
                (Q(sender=user_id) | Q(receiver=user_id))
            )

            friends = []
            for friendship in friendships:
                if str(friendship.sender.id) == user_id:
                    friends.append({
                        'id': friendship.receiver.id,
                        'isAccepted': friendship.isAccepted,
                        'sender': False,
                        'receiver': True
                    })
                else:
                    friends.append({
                        'id': friendship.sender.id,
                        'isAccepted': friendship.isAccepted,
                        'sender': True,
                        'receiver': False
                    })

            self.serializer_class = UserWithFriendShipSerializer

            users = User.objects.filter(
            id__in=[friend['id'] for friend in friends]
            ).annotate(
                accepted=Case(
                    *[When(id=friend['id'], then=Value(friend['isAccepted'], output_field=BooleanField())) for friend in friends],
                    default=Value(False, output_field=BooleanField())
                )
            )

            for user in users:
                for friend in friends:
                    if friend['id'] == user.id:
                        user.sender = friend['sender']
                        user.receiver = friend['receiver']
                        break

            return users
        
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expired")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token")
        except KeyError:
            raise AuthenticationFailed("User ID not found in token")
        

    def create(self, request, *args, **kwargs):
        try:
            self_user_id = jwt.decode(
                self.request.COOKIES.get("access_token"),
                settings.SECRET_KEY,
                algorithms=["HS256"]
            )["user_id"]
            self_user = User.objects.get(id=self_user_id)
            
            username_to_add = request.data.get("username")
            user_to_add = User.objects.get(username=username_to_add)
            
            existing_friendship = Friendship.objects.filter(
                Q(sender=self_user, receiver=user_to_add) |
                Q(sender=user_to_add, receiver=self_user)
            ).exists()
            
            if existing_friendship:
                return Response({"error": "Friendship request already exists"}, status=status.HTTP_400_BAD_REQUEST)

            friendship = Friendship.objects.create(sender=self_user, receiver=user_to_add)
            serializer = FriendshipSerializer(friendship)

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expired")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token")
        except KeyError:
            raise AuthenticationFailed("User ID not found in token")
        except User.DoesNotExist:
            return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)
    
    def patch(self, request, *args, **kwargs):
        try:
            user_id = jwt.decode(
                self.request.COOKIES.get("access_token"),
                settings.SECRET_KEY,
                algorithms=["HS256"]
            )["user_id"]
            

            action = request.data['action']
            user_to_manage_id = request.data['userId']

            friendship = Friendship.objects.filter(
                (Q(sender=user_id) & Q(receiver=user_to_manage_id))
                | (Q(sender=user_to_manage_id) & Q(receiver=user_id))
            ).first()

            if user_id == friendship.sender:
                return Response({"error": "sender cannot manage friendship"}, status=status.HTTP_401_UNAUTHORIZED)
            
            if action == "accept":
                friendship.isAccepted = True
                friendship.save()
                return Response({"success": "friend request accepted"}, status=status.HTTP_201_CREATED)
            elif action == "decline":
                friendship.delete()
                return Response({"success": "friend request declined"}, status=status.HTTP_201_CREATED)
            elif action == "delete":
                friendship.delete()
                return Response({"success": "friend deleted"}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Invalid action"}, status=status.HTTP_400_BAD_REQUEST)


        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expired")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token")
        except KeyError:
            raise AuthenticationFailed("User ID not found in token")