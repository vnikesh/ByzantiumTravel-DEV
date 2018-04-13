from django.utils import timezone
from .models import *
from django.shortcuts import render, get_object_or_404
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
import json
from . import forms

#For the wikipedia entries
import wikipediaapi

#For the rest web services
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import LocationDescriptionSerializer


def home(request):
   return render(request, 'worldmap/home.html',
                 {'worldmap': home})

def getLocationText(locationName):
    wiki_wiki = wikipediaapi.Wikipedia('en')
    page_py = wiki_wiki.page(locationName)
    return page_py.summary[0:500]

@login_required
def plannerGetStarted(request):
    form = forms.FlightForm()
    hotel_form = forms.HotelForm()
    zomato_form = forms.ZomatoForm()
    return render(request, 'worldmap/planner.html', {'hotel_form': hotel_form, 'form': form, 'zomato_form': zomato_form})


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
