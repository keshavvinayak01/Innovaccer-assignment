# Generated by Django 2.2.7 on 2019-11-21 17:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0003_auto_20191121_1746'),
    ]

    operations = [
        migrations.AlterField(
            model_name='host',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='host', to=settings.AUTH_USER_MODEL),
        ),
    ]
