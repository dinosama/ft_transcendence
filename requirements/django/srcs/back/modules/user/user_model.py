import uuid
from                  django.db import models
from django.contrib.auth.models import (
  AbstractBaseUser,
  BaseUserManager,
  PermissionsMixin
)

class CustomUserManager(BaseUserManager):
    def create_user(self, username: str, password=None, email=None, **extra_fields):
        if not username:
            raise ValueError('Le champ "username" est requis.')
        
        user = self.model(username=username, email=email, **extra_fields)
        user.set_password(password)

        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, email=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(username, password, email, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    username = models.CharField(max_length=20, unique=True, null=True)
    password = models.CharField(blank=True)
    createdAt = models.DateTimeField(auto_now=True)
    email = models.CharField(max_length=50, unique=True, null=True)
    profile_picture = models.CharField(blank=True, null=True)
    TwoFA = models.BooleanField(default=False)
    TwoFASecret = models.CharField(null=True, blank=True)
    otp = models.CharField(max_length=6, blank=True)
    otp_expiry_time = models.DateTimeField(blank=True, null=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username