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
]

urlpatterns = format_suffix_patterns(urlpatterns)
