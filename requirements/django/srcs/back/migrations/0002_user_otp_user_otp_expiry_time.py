# Generated by Django 5.0.2 on 2024-03-29 18:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('back', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='otp',
            field=models.CharField(blank=True, max_length=6),
        ),
        migrations.AddField(
            model_name='user',
            name='otp_expiry_time',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
