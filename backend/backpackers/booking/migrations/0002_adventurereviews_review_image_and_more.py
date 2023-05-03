# Generated by Django 4.2 on 2023-05-02 07:18

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):
    dependencies = [
        ("booking", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="adventurereviews",
            name="review_image",
            field=models.ImageField(
                default=django.utils.timezone.now, upload_to="photos/adventureReviews"
            ),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="resortreviews",
            name="review_image",
            field=models.ImageField(
                default=django.utils.timezone.now, upload_to="photos/resortReviews"
            ),
            preserve_default=False,
        ),
    ]
