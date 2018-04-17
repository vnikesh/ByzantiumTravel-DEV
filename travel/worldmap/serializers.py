from rest_framework import serializers
from .models import Location

class LocationDescriptionSerializer(serializers.Serializer):

    text = serializers.CharField()

class LocationSerializer(serializers.ModelSerializer):

    class Meta:
            model = Location
            fields = ('name', 'lng', 'lat', 'description', 'rank')