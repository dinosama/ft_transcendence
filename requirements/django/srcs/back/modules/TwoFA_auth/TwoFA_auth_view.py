from                  rest_framework_simplejwt.views import TokenObtainPairView
from   back.modules.TwoFA_auth.TwoFA_auth_serializer import TwoFASerializer

class TwoFAView(TokenObtainPairView):
    serializer_class = TwoFASerializer