from django.db import models
from django.contrib.auth.models import User
import decimal
# Create your models here.


class Region (models.Model):
    name = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=500, null=False)

    def __str__(self):
        return self.name

class Type (models.Model):
    name = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=500, null=False)

    def __str__(self):
        return self.name

class Location (models.Model):
    name = models.CharField(max_length=200, null=False)
    lng = models.DecimalField(max_digits=50, decimal_places=7, null=False)
    lat = models.DecimalField(max_digits=50, decimal_places=7, null=False)
    description = models.CharField(max_length=500, null=False)
    type = models.ForeignKey(Type, related_name='region')
    rank = models.IntegerField(null=True)
    airportCode = models.CharField(max_length=10, null=False)
    region = models.ForeignKey(Region, related_name='region')

    def __str__(self):
        return self.name

    def __iter__(self):
        return [self.name,
                self.lng,
                self.lat,
                self.description,
                self.type,
                self.rank,
                self.airportCode,
                self.region]

    def getNameLngLatDescription(self):
        return [{"name": str(self.name), "lng": str(self.lng), "lat": str(self.lat), "description": str(self.description), "rank": str(self.rank)}]

class VisitorInterest (models.Model):
    user = models.CharField(max_length=200, null=False)
    location = models.CharField(max_length=200, null=False)
    searches = models.IntegerField(null=True)


    def __str__(self):
        return self.user + " " + self.location + ": " + str(self.searches)