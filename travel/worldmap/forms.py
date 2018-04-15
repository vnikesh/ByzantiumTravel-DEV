from django import forms


class FlightForm(forms.Form):
    origin = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'origin', 'placeholder': 'OMA'}))
    destination = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'destination', 'placeholder': 'LAX'}))
    startdate = forms.DateField(widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'startdate', 'placeholder': 'YYYY-MM-DD'}))


class HotelForm(forms.Form):
    location = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'location', 'placeholder': 'LAX'}))
    check_in = forms.DateField(widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'check_in', 'placeholder': 'YYYY-MM-DD'}))
    check_out = forms.DateField(widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'check_out', 'placeholder': 'YYYY-MM-DD'}))


class ZomatoForm(forms.Form):
    locationcity = forms.CharField(widget=forms.TextInput(attrs={'class': 'form-control', 'id': 'keyword', 'placeholder': 'Pizza'}))
