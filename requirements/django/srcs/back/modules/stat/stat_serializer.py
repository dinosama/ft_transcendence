from back.modules.stat.stat_model      import Stat
from back.modules.user.user_serializer import UserSerializer
from rest_framework.serializers        import ModelSerializer

class StatSerializer(ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Stat
        fields = '__all__'
