# Generated by Django 3.2.7 on 2021-11-01 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pics', '0010_alter_userjti_jti'),
    ]

    operations = [
        migrations.AddField(
            model_name='image',
            name='order',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
