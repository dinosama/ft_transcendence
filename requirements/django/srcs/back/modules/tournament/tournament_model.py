from django.db import models
import uuid

class Tournament(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    game1 = models.ForeignKey(
        "Game",
        on_delete=models.CASCADE,
        related_name='game1'
    )

    game2 = models.ForeignKey(
        "Game",
        on_delete=models.CASCADE,
        related_name='game2'
    )

    game3 = models.ForeignKey(
        "Game",
        on_delete=models.CASCADE,
        related_name='game3'
    )

    game4 = models.ForeignKey(
        "Game",
        on_delete=models.CASCADE,
        related_name='game4'
    )