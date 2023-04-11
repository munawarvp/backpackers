from django.db import models
from account.models import User

# Create your models here.

class Location(models.Model):
    city_name = models.CharField(max_length=100)
    state = models.CharField(max_length=50)

    def __str__(self):
        return self.city_name
    
class Resorts(models.Model):
    owner           = models.ForeignKey(User, on_delete=models.CASCADE)
    resort_name     = models.CharField(max_length=200)
    location        = models.ForeignKey(Location, on_delete=models.CASCADE)
    map_location    = models.FloatField(blank=True, null=True)
    place           = models.CharField(max_length=100)
    address         = models.CharField(max_length=250)
    zipcode         = models.CharField(max_length=25)
    phone_number    = models.CharField(max_length=12)
    room_type       = models.CharField(max_length=100)
    price           = models.IntegerField()
    description     = models.TextField()
    rooms_available = models.IntegerField()
    pool_available  = models.BooleanField()
    wifi_available  = models.BooleanField()

    image_one       = models.ImageField(upload_to='photos/resorts')
    image_two       = models.ImageField(upload_to='photos/resorts')
    image_three     = models.ImageField(upload_to='photos/resorts',blank=True, null=True)
    image_four      = models.ImageField(upload_to='photos/resorts',blank=True, null=True)

    is_approved     = models.BooleanField(default=False)

    created_date    = models.DateTimeField(auto_now_add=True)
    modified_date   = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.resort_name