from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^flights/$', views.flights, name='flights'),
    url(r'^hotels/$', views.hotels, name='hotels'),
    # url(r'^home/$', views.home, name='home'),
    # url('r^$',views.flights, name='flights'),
    # url('r^$',views.hotels, name='hotels'),
]