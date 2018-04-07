from django import forms
from bootstrap_datepicker.widgets import DatePicker

class FlightForm (forms.Form):
    origin = forms.CharField()
    destination = forms.CharField()
    date = forms.DateField(
        widget=DatePicker(
            options={
                "format": "mm/dd/yyyy",
                "autoclose": True
            }
        )
    )