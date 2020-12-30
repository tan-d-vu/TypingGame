from django import forms
from django.forms.widgets import HiddenInput
from fasttyper_app.models import Player


class PlayerInfo(forms.ModelForm):
    player_name = forms.CharField(max_length=32)
    player_score = forms.IntegerField(widget=forms.HiddenInput())

    class Meta:
        model = Player
        fields = '__all__'
