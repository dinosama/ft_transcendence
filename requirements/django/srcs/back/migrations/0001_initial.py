# Generated by Django 5.0.2 on 2024-03-11 23:45

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=20, null=True, unique=True)),
                ('password', models.CharField(blank=True)),
                ('createdAt', models.DateTimeField(auto_now=True)),
                ('email', models.CharField(max_length=50, null=True, unique=True)),
                ('profile_picture', models.URLField(blank=True)),
                ('TwoFA', models.BooleanField(default=False)),
                ('TwoFASecret', models.CharField(blank=True, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Blocked',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('BlockedBy', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blocked_by', to=settings.AUTH_USER_MODEL)),
                ('userBlocked', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_blocked', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Friendship',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('isAccepted', models.BooleanField(default=False)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='received_friend_requests', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_friend_requests', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Game',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('createdAt', models.DateTimeField(auto_now=True)),
                ('winerScore', models.IntegerField(default=0)),
                ('loserScore', models.IntegerField(default=0)),
                ('player1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='player1', to=settings.AUTH_USER_MODEL)),
                ('player2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='player2', to=settings.AUTH_USER_MODEL)),
                ('winner', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='winner', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('createdAt', models.DateTimeField(auto_now=True)),
                ('content', models.CharField(max_length=255, null=True, unique=True)),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receive_message', to=settings.AUTH_USER_MODEL)),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sent_message', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Stat',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('gamePlayed', models.IntegerField(default=0)),
                ('gameWin', models.IntegerField(default=0)),
                ('gameLost', models.IntegerField(default=0)),
                ('actualWinStreak', models.IntegerField(default=0)),
                ('longestWinStreak', models.IntegerField(default=0)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('game1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='game1', to='back.game')),
                ('game2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='game2', to='back.game')),
                ('game3', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='game3', to='back.game')),
                ('game4', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='game4', to='back.game')),
            ],
        ),
    ]
