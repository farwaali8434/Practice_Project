# Generated by Django 3.0.1 on 2020-01-02 10:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('practice', '0005_video'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='images',
            field=models.ImageField(blank=True, upload_to='images'),
        ),
    ]
