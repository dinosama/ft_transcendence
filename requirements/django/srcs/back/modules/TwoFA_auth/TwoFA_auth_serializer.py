from                       rest_framework import serializers
from                  django.contrib.auth import authenticate
from      rest_framework_simplejwt.tokens import RefreshToken
from                      back.lib.crypto import AesCrypto

class TwoFASerializer(serializers.Serializer):

    def validate(self, attrs):
        aes = AesCrypto()
        token = self.initial_data.get('token')

        try:
            clear = aes.cbcDecrypt(token)
        except:
            return {"invalid-2fa" : "Wrong 2FA code"}

        username, password, _ = clear.split(':')

        user = authenticate(username=username, password=password)
        TwoFASecret = getattr(user, 'TwoFASecret', None)

        if token == TwoFASecret:
            refresh = RefreshToken.for_user(user)

            return {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        else:
            return {"invalid-2fa" : "Wrong 2FA code"}
