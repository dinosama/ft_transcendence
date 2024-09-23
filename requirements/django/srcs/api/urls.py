# Django
from django.urls import path, include
from django.contrib import admin

# REST
from rest_framework import routers

# Viewset
from back.views import UserViewSet
from back.views import GameViewSet
from back.views import FriendshipViewSet
from back.views import StatViewSet
from back.views import LoginView
from back.views import TwoFAView

# JWT
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Router endpoints
router = routers.SimpleRouter()
router.register('user', UserViewSet, basename='user')
router.register('game', GameViewSet, basename='game')
router.register('friend', FriendshipViewSet, basename='friend')
router.register('stat', StatViewSet, basename='stat')


urlpatterns = [

    #auth
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    
    #api
    path('api/', include(router.urls)),

    #token
    path('api/submit-2fa-auth/', TwoFAView.as_view(), name='submit-2fa-auth'),
    path('api/token/', LoginView.as_view(), name='token_obtain_pair'),
    # path('api/2fa-auth/', LoginView.as_view(), name='2fa-auth'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]