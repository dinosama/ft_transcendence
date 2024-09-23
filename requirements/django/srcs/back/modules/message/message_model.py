from django.db import models
import uuid

class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    createdAt = models.DateTimeField(auto_now=True)
    content = models.CharField(max_length=255, unique=True, null=True)

    sender = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name='sent_message'
    )

    receiver = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name='receive_message'
    )