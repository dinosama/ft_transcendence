from rest_framework.serializers   import ModelSerializer
from back.modules.user.user_model import User
from back.modules.stat.stat_model import Stat
from django.contrib.auth.hashers  import make_password
from rest_framework import serializers

class UserWithFriendShipSerializer(ModelSerializer):
    accepted = serializers.BooleanField(default=False)
    receiver = serializers.BooleanField(default=False)
    sender = serializers.BooleanField(default=False)

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super(UserWithFriendShipSerializer, self).create(validated_data)
    
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}
        
class UserSerializer(ModelSerializer):
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        user = super(UserSerializer, self).create(validated_data)
        Stat.objects.create(user=user)
        return user
    
    class Meta:
        model = User
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}
