# Generated by Django 4.2 on 2023-04-09 09:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="Location",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("city_name", models.CharField(max_length=100)),
                ("state", models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name="Resorts",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("resort_name", models.CharField(max_length=200)),
                ("slug", models.SlugField(max_length=200, unique=True)),
                ("map_location", models.FloatField(blank=True)),
                ("place", models.CharField(max_length=100)),
                ("address", models.CharField(max_length=250)),
                ("zipcode", models.CharField(max_length=25)),
                ("phone_number", models.CharField(max_length=12)),
                ("room_type", models.CharField(max_length=100)),
                ("price", models.IntegerField()),
                ("description", models.TextField()),
                ("rooms_available", models.IntegerField()),
                ("pool_available", models.BooleanField()),
                ("wifi_available", models.BooleanField()),
                ("image_one", models.ImageField(upload_to="photos/resorts")),
                ("image_two", models.ImageField(upload_to="photos/resorts")),
                ("image_three", models.ImageField(upload_to="photos/resorts")),
                ("image_four", models.ImageField(upload_to="photos/resorts")),
                ("is_approved", models.BooleanField(default=False)),
                ("created_date", models.DateTimeField(auto_now_add=True)),
                ("modified_date", models.DateTimeField(auto_now=True)),
                (
                    "location",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="resorts.location",
                    ),
                ),
                (
                    "owner",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
