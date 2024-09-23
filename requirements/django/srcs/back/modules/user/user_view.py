from           rest_framework.viewsets import ModelViewSet
from           rest_framework.response import Response
from                    rest_framework import status
from back.modules.user.user_serializer import UserSerializer
from back.modules.user.user_model      import User
from                    rest_framework import status
from           rest_framework.response import Response
from                       django.conf import settings
from         rest_framework.exceptions import AuthenticationFailed
from               django.contrib.auth import authenticate
from django.contrib.auth.hashers       import make_password
import random
import jwt
import base64
import random
import string

def generate_random_string(length=16):
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string

def generate_random_digits(n=6):
    return "".join(map(str, random.sample(range(0, 10), n)))

def saveB64ImageToPath(imageB64: str, path: str): 
    try:
        binary_data = base64.b64decode(imageB64)
        with open(path, 'wb') as f:
            f.write(binary_data)
        return True
    
    except:
        return False

class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer

    def retrieve(self, request):
        username = request.query_params.get('username', None)
        if username is not None:
            try:
                user = User.objects.get(username=username).first()
                serializer = UserSerializer(user)
                return Response(serializer.data)
            except User.DoesNotExist:
                return Response({"error": "User not found"}, status=404)
        else:
            return Response({"error": "Username parameter is missing"}, status=400)
    
    def get_queryset(self):
        username = self.request.query_params.get('username', None)
        return User.objects.filter(username=username)

    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            status=status.HTTP_201_CREATED,
            headers=self.get_success_headers(serializer.data)
        )

    def patch(self, request, *args, **kwargs):
        try:
            user_id = jwt.decode(
                self.request.COOKIES.get("access_token"),
                settings.SECRET_KEY,
                algorithms=["HS256"]
            )["user_id"]
            
            user = User.objects.get(id=user_id)
            username = getattr(user, 'username', None)
            savePassword = request.data['savePassword']
            user = authenticate(username=username, password=savePassword)
            updateUserId = getattr(user, 'id', None)
            
            if str(updateUserId) == user_id:
                try:
                    imageB64 = request.data['profilePicture']
                except: 
                    imageB64 = None
                if imageB64:
                    file = generate_random_string()
                    path = f"/app/profile-pictures/{file}.jpg"
                    if not saveB64ImageToPath(imageB64, path):
                        return Response({"error": "The profile picture is invalid"}, status=status.HTTP_400_BAD_REQUEST)
                    
                    user.profile_picture = f"../img/profile-picture/{file}.jpg"
                
                if user.TwoFA != request.data['TwoFA']:
                    user.TwoFA = request.data['TwoFA']
                
                if user.username != request.data['username'] and request.data['username'] != "":
                    user.username = request.data['username']
                
                if user.email != request.data['email'] and request.data['email'] != "":
                    user.email = request.data['email']

                if request.data['password'] != "":
                    user.password = make_password(request.data['password'])

                
                user.save()
                return Response({"success": "update successfully done"}, status=status.HTTP_201_CREATED)
            else:
                return Response({"error": "Wrong password"}, status=status.HTTP_401_UNAUTHORIZED)

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Token expired")
        except jwt.InvalidTokenError:
            raise AuthenticationFailed("Invalid token")
        except KeyError:
            raise AuthenticationFailed("User ID not found in token")