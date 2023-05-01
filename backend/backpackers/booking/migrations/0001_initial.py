# Generated by Django 4.2 on 2023-04-25 04:23

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
            name="ResortBooking",
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
                ("booking_id", models.CharField(max_length=20)),
                ("check_in", models.DateField()),
                ("check_out", models.DateField()),
                ("first_name", models.CharField(max_length=50)),
                ("last_name", models.CharField(max_length=50)),
                ("phone_number", models.CharField(max_length=15)),
                ("email", models.EmailField(max_length=254)),
                ("booking_total", models.FloatField()),
                ("payment_method", models.CharField(max_length=30)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("New", "New"),
                            ("Confirm", "Confirm"),
                            ("Pending", "Pending"),
                        ],
                        default="New",
                        max_length=20,
                    ),
                ),
                ("occupancy", models.IntegerField()),
                ("booking_data", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now_add=True)),
                (
                    "booked_resort",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="bookings",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]