from rest_framework import serializers


class LocationDescriptionSerializer(serializers.Serializer):

    text = serializers.CharField()
