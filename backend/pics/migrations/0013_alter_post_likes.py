# Generated by Django 3.2.7 on 2021-12-01 16:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pics', '0012_post_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='likes',
            field=models.PositiveBigIntegerField(default=0),
        ),
    ]