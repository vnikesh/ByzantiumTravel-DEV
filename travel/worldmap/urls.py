from django.conf.urls import url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^home/$', views.home, name='home'),
    url(r'^planner/$', views.plannerGetStarted, name='getStarted'),
    url(r'^accounts/profile/$', views.home, name='profile'),
    url(r'^location_json/', views.LocationText.as_view()),
    url(r'^planner/location_information/$', views.locationInformation, name='location'),
    url(r'^planner/location_LngLat/$', views.getLngLat, name='lnglat'),
    url(r'^planner/location_AirportCode/$', views.getAirportCode, name='airportCode'),
    url(r'^planner/locations/$', views.getLocations, name='locations'),
    url(r'^planner/locationsByType/$', views.getLocationsByType, name='locationsByType'),
    url(r'^planner/location/$', views.getLocation, name='getLocation'),
    url(r'^planner/search_update/$', views.searchUpdate, name='searchUpdate'),
    url(r'^sendsms/$', views.send_twilio_message, name='send_sms'),
]

urlpatterns = format_suffix_patterns(urlpatterns)