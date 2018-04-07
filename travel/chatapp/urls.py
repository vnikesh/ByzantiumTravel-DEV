from django.conf.urls import url
from . import views


urlpatterns = [
    url(r'^chat/$', views.app, name='twilio'),
    url(r'^token', views.token, name='token'),
]