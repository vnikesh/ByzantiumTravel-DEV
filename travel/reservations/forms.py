from django import forms


class FlightForm(forms.Form):
    origin = forms.CharField()
    destination = forms.CharField()
    startdate = forms.DateField()


class HotelForm(forms.Form):
    location = forms.CharField()
    checkin = forms.DateField()
    checkout = forms.DateField()