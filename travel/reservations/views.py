from django.utils import timezone
from .models import *
from django.shortcuts import render, get_object_or_404
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
import json
import urllib.parse
import requests
import datetime
from .forms import *
from . import forms
from amadeus import Flights
from amadeus import Hotels
from django.http import HttpResponse, HttpResponseRedirect
from django.http.response import JsonResponse
from pyzomato import Pyzomato


# Create your views here.
#
# def flights(request):
#     if request.method == 'POST':
#         form = forms.FlightForm()
#         return render(request, 'flights.html',
#                  {'form': form})
#
# def hotels(request):
#     if request.method == 'POST':
#         hform = forms.HotelForm()
#         return render(request, 'hotels.html',
#                  {'reservations': hotels})


def getFlights(request):
    flights = Flights('Zt0AY8d5B9UA7ERLccCjiGF6l6gpcUoS')
    if request.method == 'POST':
        form = FlightForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            resp = flights.extensive_search(
                origin = data['origin'],
                destination = data['destination'],
                #departure_date = '2018-05-15--2018-05-30'
                departure_date = data['startdate'])
            #print(resp)
            #return HttpResponse(resp['results'][0]['price'])
        return HttpResponse(json.dumps(resp))


def getHotels(request):
    hotels = Hotels('Zt0AY8d5B9UA7ERLccCjiGF6l6gpcUoS')
    if request.method == 'POST':
        hotel_form = HotelForm(request.POST)
        if hotel_form.is_valid():
            data1 = hotel_form.cleaned_data
            resp1 = hotels.search_airport(location=data1['location'],
                                         check_in=data1['check_in'],
                                         check_out=data1['check_out'])
        return HttpResponse(json.dumps(resp1))

def getZomato(request):
    p = Pyzomato('1c9999881f4fe458a246ecbb5e5a4f36')
    if request.method == 'POST':
        zomato_form = ZomatoForm(request.POST)
        if zomato_form.is_valid():
            data2 = zomato_form.cleaned_data
            resp2 = p.search(q=data2['locationcity'])
    return HttpResponse(json.dumps(resp2))


# def flights(request):
#     main_api = "https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?apikey="
#
#     apikey = ""
#     # origin = input("enter origin city name : ")
#
#
#     # dest = input("enter destination city : ")
#
#
#     # depart_date = input('enter departure date YYYY-MM-dd format')
#     # year, month, day = map(int, depart_date.split('-'))
#     # dep_date = datetime.date(year, month, day)
#     #
#     #
#     # return_date = input("enter return date YYYY-MM-dd")
#     # year, month, day = map(int, return_date.split('-'))
#     # ret_date = datetime.date(year, month, day)
#
#
#
#     url = main_api + apikey + '&' + urllib.parse.urlencode({'origin': origin}) + '&' + urllib.parse.urlencode({'destination': dest})
#           # + '&' + urllib.parse.urlencode({'departure_date': dep_date}) + urllib.parse.urlencode({''.ret_date})
#
#
#     print(url)
#     json_data = requests.get(url).json()
#
#     # print(json_data)
#
#     fdestination = json_data['results'][0]['destination']
#
#     dep_date = json_data['results'][0]['departure_date']
#
#     return_date = json_data['results'][0]['return_date']
#
#     price = json_data['results'][0]['price']
#
#     airline = json_data['results'][0]['airline']
#
#
#     print("Origin        : ", origin)
#     print("Destination   : ", fdestination)
#     print("Departure date: ", dep_date)
#     print("Return Date   : ", return_date)
#     print("Price         : $", price)
#     print("Airline       : ", airline)
#
#     return render(request, 'reservations/flights.html',
#                   {'reservations': flights})
