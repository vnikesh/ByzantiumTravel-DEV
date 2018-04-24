from django.utils import timezone
from .models import *
from django.shortcuts import render, get_object_or_404
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
import json
from . import forms
from worldmap.models import Region, Type, Location, VisitorInterest
from django.core import serializers
from django.conf import settings
from twilio.rest import Client

#For the wikipedia entries
import wikipediaapi
import twilio.rest

#For the rest web services
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import LocationDescriptionSerializer, LocationSerializer


def home(request):
   return render(request, 'worldmap/home.html',
                 {'worldmap': home})

def getLocationText(locationName):
    wiki_wiki = wikipediaapi.Wikipedia('en')
    page_py = wiki_wiki.page(locationName)
    return page_py.summary[0:800]

@login_required
def plannerGetStarted(request):
    form = forms.FlightForm()
    hotel_form = forms.HotelForm()
    zomato_form = forms.ZomatoForm()
    sms_form = forms.SendSMSForm()
    return render(request, 'worldmap/planner.html', {'hotel_form': hotel_form, 'form': form, 'zomato_form': zomato_form, 'sms_form': sms_form})


#Functions to get json strings
class LocationText(APIView):

    def get(self,request):
        text_json = LocationText('Denver')
        data = [{"text" : text_json}]
        serializer = LocationDescriptionSerializer(data, many=True)
        return Response(serializer.data)

def locationInformation(request):
    if request.method == 'POST':
        if 'location' in request.POST:
            location = request.POST['location']
            text = getLocationText(location)
            return HttpResponse(text) # if everything is OK
    # nothing went well
    return HttpResponse('FAIL!!!!!')

#Function to grab lng and lat for a specific location
def getLngLat(request):
    if request.method == 'POST':
        if 'location' in request.POST:
            location = request.POST['location']
            locObject = Location.objects.get(name=location)
            data = [{"lng": str(locObject.lng), "lat": str(locObject.lat)}]
            return HttpResponse(json.dumps(data))

    return HttpResponse('FAIL!!!!!')

#Function to grab the airportCode for a specific location
def getAirportCode(request):
    if request.method == 'POST':
        if 'location' in request.POST:
            location = request.POST['location']
            locObject = Location.objects.get(name=location)
            return HttpResponse(str(locObject.airportCode))

    return HttpResponse('FAIL!!!!!')

#Function to grab all the information about the locations
def getLocations(request):
    if request.method == 'POST':
        locations = Location.objects.all()
        serializer = LocationSerializer(locations, many=True)
        return HttpResponse(json.dumps(serializer.data))

    return HttpResponse('FAIL!!!!!')

#Function to grab all the information about the locations
def getLocation(request):
    if request.method == 'POST':
        if 'location' in request.POST:
            location = request.POST['location']
            location = Location.objects.get(name=location).getNameLngLatDescription()
            return HttpResponse(json.dumps(location))
            #return HttpResponse('test')

    return HttpResponse('FAIL!!!!!')

#Function to grab the airportCode for a specific location
def getLocationsByType(request):
    if request.method == 'POST':
        if 'type' in request.POST:
            type = request.POST['type']
            selectedType = Type.objects.get(name=type)
            locations = Location.objects.filter(type=selectedType)
            serializer = LocationSerializer(locations, many=True)
            return HttpResponse(json.dumps(serializer.data))

    return HttpResponse('FAIL!!!!!')

#Function to update the VisitorInterest table
def searchUpdate(request):
    if request.method == 'POST':
        if 'location' in request.POST:
            location = request.POST['location']
            username = request.user.username
            if VisitorInterest.objects.filter(user=username).exists():
                if VisitorInterest.objects.filter(user=username).filter(location=location).exists():
                    object = VisitorInterest.objects.filter(user=username).get(location=location)
                    object.searches = object.searches + 1
                    object.save()
                else:
                    entry = VisitorInterest(user=username, location=location, searches=1)
                    entry.save()
            else:
                entry =  VisitorInterest(user=username, location=location, searches= 1)
                entry.save()
            return HttpResponse('')

    print('FAIL!!!!!')


#function for writing a sms
def send_twilio_message(request):
    #sid = "AC77010b7d86d3a356f80667e6d790c128"
    #token = "b0fd38a04a4e570bb6d3f35e570a67d4"
    client = Client(settings.TWILIO_ACCT_SID, settings.TWILIO_AUTH_TOKEN)
    #client = Client("AC77010b7d86d3a356f80667e6d790c128","b0fd38a04a4e570bb6d3f35e570a67d4")
    # if request.method == 'POST':
    #     sms_form = SMSForm(request.POST)
    #     if sms_form.is_valid():
    #         data2 = zomato_form.cleaned_data
    #         resp2 = p.search(q=data2['locationcity'], lat='41.277072', lon='-96.060682', radius='25000', count='3',
    #                          sort='rating')
    client.messages.create(
        body=request.POST['body'],
        to=request.POST['to_number'],
        #to='+14026861203',
        from_='+14028108945'  #settings.TWILIO_PHONE_NUMBER
    )

    print(request.POST['to_number'])
    return HttpResponse('');