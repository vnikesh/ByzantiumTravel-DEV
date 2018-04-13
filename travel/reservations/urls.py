from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^getFlights/$', views.getFlights, name='getFlights'),
    url(r'^getHotels/$', views.getHotels, name='getHotels'),
    url(r'^getZomato/$', views.getZomato, name='getZomato'),
    # url(r'^home/$', views.home, name='home'),
    # url('r^$',views.flights, name='flights'),
    # url('r^$',views.hotels, name='hotels'),
]