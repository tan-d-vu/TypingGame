from django.db import models

# Create your models here.
class Player(models.Model):
    player_name = models.CharField(max_length=32, unique=False, blank=False)
    player_score = models.IntegerField()
