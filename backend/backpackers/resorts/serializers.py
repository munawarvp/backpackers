from rest_framework import serializers
from .models import Resorts, Location


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

class ResortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resorts
        fields = '__all__'