# Generated by Django 4.2 on 2023-04-15 05:03

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        ("resorts", "0007_adventures"),
    ]

    operations = [
        migrations.AddField(
            model_name="adventures",
            name="place",
            field=models.CharField(default=django.utils.timezone.now, max_length=200),
            preserve_default=False,
        ),
    ]
