from back.modules.game.game_model      import Game
from back.modules.user.user_serializer import UserSerializer
from rest_framework.serializers        import ModelSerializer

class GameSerializer(ModelSerializer):
    player1 = UserSerializer()
    player2 = UserSerializer()
    winner = UserSerializer()

    class Meta:
        model = Game
        fields = '__all__'
