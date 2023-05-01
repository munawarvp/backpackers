# Generated by Django 4.2 on 2023-04-28 08:45

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("booking", "0005_adventurebooking"),
    ]

    operations = [
        migrations.AlterField(
            model_name="adventurebooking",
            name="status",
            field=models.CharField(
                choices=[
                    ("New", "New"),
                    ("Checked In", "Checked In"),
                    ("Checked Out", "Checked Out"),
                    ("Pending", "Pending"),
                ],
                default="New",
                max_length=20,
            ),
        ),
        migrations.AlterField(
            model_name="resortbooking",
            name="status",
            field=models.CharField(
                choices=[
                    ("New", "New"),
                    ("Checked In", "Checked In"),
                    ("Checked Out", "Checked Out"),
                    ("Cancelled", "Cancelled"),
                ],
                default="New",
                max_length=20,
            ),
        ),
    ]