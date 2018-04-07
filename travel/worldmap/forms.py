from django import forms

class FlightForm (forms.Form):
    origin = forms.CharField()
    destination = forms.CharField()