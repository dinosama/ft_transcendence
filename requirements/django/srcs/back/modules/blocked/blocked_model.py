from django.db import models
import uuid

class Blocked(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    BlockedBy = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name='blocked_by'
    )
    
    userBlocked = models.ForeignKey(
        "User",
        on_delete=models.CASCADE,
        related_name='user_blocked'
    )