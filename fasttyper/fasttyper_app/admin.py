from django.contrib import admin
from fasttyper_app.models import Player

# Register your models here.
class PlayerAdmin(admin.ModelAdmin):
    pass
admin.site.register(Player, PlayerAdmin)
