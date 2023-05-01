# Generated by Django 4.2 on 2023-04-25 11:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("resorts", "0015_adventures_price"),
        ("booking", "0002_resortbooking_address"),
    ]

    operations = [
        migrations.AlterField(
            model_name="resortbooking",
            name="booked_resort",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="resorts.resorts"
            ),
        ),
    ]