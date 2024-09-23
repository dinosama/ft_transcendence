from back.modules.friendship.friendship_model import Friendship
from back.modules.user.user_serializer        import UserSerializer
from rest_framework.serializers               import ModelSerializer


class FriendshipSerializer(ModelSerializer):
    
    receiver = UserSerializer()
    sender = UserSerializer()

    class Meta:
        model = Friendship
        fields = '__all__'