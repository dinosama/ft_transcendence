from django.db import models
import uuid

class Game(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    createdAt = models.DateTimeField(auto_now=True)
    winerScore = models.IntegerField(default=0)
    loserScore = models.IntegerField(default=0)

    player1 = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name='player1'
    )

    player2 = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name='player2'
    )

    winner = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name='winner',
        blank=True,
        null=True
    )