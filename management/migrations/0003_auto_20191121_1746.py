# Generated by Django 2.2.7 on 2019-11-21 17:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('management', '0002_auto_20191121_1656'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visitor',
            name='host',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='visitors', to='management.Host'),
        ),
    ]