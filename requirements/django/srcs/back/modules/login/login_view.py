from back.modules.login.login_serializer import LoginSerializer
from      rest_framework_simplejwt.views import TokenObtainPairView

class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer
