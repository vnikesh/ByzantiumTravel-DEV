from django.utils import timezone
from .models import *
from django.shortcuts import render, get_object_or_404
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
import json
import urllib.parse
import requests
import datetime

# Create your views here.


def flights(request):

   return render(request, 'flights.html',
                 {'reservations': flights})


def hotels(request):

   return render(request, 'hotels.html',
                 {'reservations': hotels})


# def flights(request):
#     main_api = "https://api.sandbox.amadeus.com/v1.2/flights/inspiration-search?apikey="
#
#     apikey = "4KIaWG7sAB9gq717tSVFb80WzWSfesNt"
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
