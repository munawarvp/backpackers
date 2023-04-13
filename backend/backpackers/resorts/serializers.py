from rest_framework import serializers
from .models import Resorts, Location
from account.serializers import UserSerializer


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class ResortSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only = True)
    class Meta:
        model = Resorts
        fields = '__all__'