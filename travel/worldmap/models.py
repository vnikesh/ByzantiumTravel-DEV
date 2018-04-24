from django.db import models
from django.contrib.auth.models import User, Permission
import decimal

from django import forms
from django.core.validators import MinLengthValidator
from django.core.validators import MaxLengthValidator
from django.core.validators import RegexValidator
from django.utils import timezone
# Create your models here.


class SendSMS(models.Model):
    to_number = models.CharField(max_length=30)
    from_number = models.CharField(max_length=30)
    body = models.CharField(max_length=500, default="", blank=True)
    sms_sid = models.CharField(max_length=34, default="", blank=True)
    account_sid = models.CharField(max_length=34, default="", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    sent_at = models.DateTimeField(null=True, blank=True)
    delivered_at = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, default="", blank=True)

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