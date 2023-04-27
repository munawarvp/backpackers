from django.db import models
from account.models import User
from resorts.models import Resorts, Adventures

# Create your models here.

class ResortBooking(models.Model):
    STATUS = (
        ('New', 'New'),
        ('Confirm', 'Confirm'),
        ('Pending', 'Pending'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    booked_resort = models.ForeignKey(Resorts, on_delete=models.CASCADE)
    booking_id = models.CharField(max_length=20)
    check_in = models.DateField()
    check_out = models.DateField()
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.TextField()
    booking_total = models.FloatField()
    payment_method = models.CharField(max_length=30)
    status = models.CharField(max_length=20, choices=STATUS, default='New')
    occupancy = models.IntegerField()
    
    booking_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username



class AdventureBooking(models.Model):
    STATUS = (
        ('New', 'New'),
        ('Confirm', 'Confirm'),
        ('Pending', 'Pending'),
    )
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    booked_activity = models.ForeignKey(Adventures, on_delete=models.CASCADE)
    booking_id = models.CharField(max_length=20)
    first_name = models.CharField(max_length=50)
    email = models.EmailField()
    address = models.TextField()
    age = models.IntegerField()
    activity_date = models.DateField()
    phone_number = models.CharField(max_length=15)
    weight = models.IntegerField()
    guardian_name = models.CharField(max_length=50)
    guardian_phone = models.CharField(max_length=50)
    booking_total = models.FloatField()
    medical_condition = models.BooleanField(default=False)
    payment_method = models.CharField(max_length=30)

    status = models.CharField(max_length=20, choices=STATUS, default='New')
    booking_date = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.first_name