from django import forms


class FlightForm(forms.Form):
    origin = forms.CharField()
    destination = forms.CharField()
    startdate = forms.DateField()


class HotelForm(forms.Form):
    location = forms.CharField()
    check_in = forms.DateField()
    check_out = forms.DateField()


class ZomatoForm(forms.Form):
    locationcity = forms.CharField()
