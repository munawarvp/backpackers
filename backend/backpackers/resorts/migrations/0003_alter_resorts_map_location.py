# Generated by Django 4.2 on 2023-04-09 17:36

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("resorts", "0002_remove_resorts_slug"),
    ]

    operations = [
        migrations.AlterField(
            model_name="resorts",
            name="map_location",
            field=models.FloatField(blank=True, null=True),
        ),
    ]
