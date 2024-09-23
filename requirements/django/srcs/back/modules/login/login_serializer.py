from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from    back.modules.user.user_model      import User
from                     django.core.mail import send_mail
from                          django.conf import settings
from                      back.lib.crypto import AesCrypto
import time

def generate2faToken(username, password):
    timestamp = str(int(time.time()))
    return (username + ":" + password + ":" + timestamp)

class LoginSerializer(TokenObtainPairSerializer):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def validate(self, attrs):
        data = super().validate(attrs)
        username = attrs.get(self.username_field)
        user = User.objects.filter(username = username).first()
        if user and not user.TwoFA:
            return data 
        else:
            aes = AesCrypto()
            token = generate2faToken(attrs['username'], attrs['password'])
            cipher = aes.cbcEncrypt(token)
            
            user.TwoFASecret = cipher
            user.save()

            send_mail(
                subject = '2fa',
                message = str(cipher),
                from_email = settings.EMAIL_HOST_USER,
                recipient_list = [user.email]
            )
            return {"2fa-required": "An email with the secret pass has been sent."}