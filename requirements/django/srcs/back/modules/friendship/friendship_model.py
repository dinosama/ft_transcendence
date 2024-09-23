from django.db import models

class Friendship(models.Model):
    sender = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name='sent_friend_requests'
    )

    receiver = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name='received_friend_requests'
    )

    isAccepted = models.BooleanField(default=False)