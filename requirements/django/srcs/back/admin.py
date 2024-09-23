from             back.modules.user.user_model import User
from back.modules.friendship.friendship_model import Friendship
from       back.modules.blocked.blocked_model import Blocked
from       back.modules.message.message_model import Message
from             back.modules.stat.stat_model import Stat
from             back.modules.game.game_model import Game
from back.modules.tournament.tournament_model import Tournament
from                           django.contrib import admin

# Register your models here.
admin.site.register(User)
admin.site.register(Friendship)
admin.site.register(Blocked)
admin.site.register(Message)
admin.site.register(Stat)
admin.site.register(Game)
admin.site.register(Tournament)
