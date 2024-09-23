from django.db import models
import uuid

class Stat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
    )

    gamePlayed = models.IntegerField(default=0)
    gameWin = models.IntegerField(default=0)
    gameLost = models.IntegerField(default=0)
    actualWinStreak = models.IntegerField(default=0)
    longestWinStreak = models.IntegerField(default=0)