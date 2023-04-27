from .models import ResortBooking, AdventureBooking
from rest_framework import serializers

from account.serializers import UserSerializer
from resorts.serializers import ResortSerializer, AdventureSerializer


class ResortBookingSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    booked_resort = ResortSerializer()
    class Meta:
        model = ResortBooking
        fields = '__all__'

class PostResortBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResortBooking
        fields = '__all__'


class AdventureBookingSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    booked_activity = AdventureSerializer()
    class Meta:
        model = AdventureBooking
        fields = '__all__'

class PostAdventureBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdventureBooking
        fields = '__all__'