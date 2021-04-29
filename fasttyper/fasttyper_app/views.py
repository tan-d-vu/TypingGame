from fasttyper_app.models import Player
from django.shortcuts import render
from fasttyper_app.forms import PlayerInfo
import random, os

def _load_words():
    random_words = ""
    pwd = os.path.dirname(__file__)
    n = 0
    
    word_list = open(os.path.join(pwd, 'words.txt')).read().split()
    while n < 100:
        random_words += str(random.choice(word_list)) + " "
        n += 1

    return random_words

def gameplay(request):
    #origin_text = "hi hello "

    playerInfoForm = PlayerInfo()
    # Getting top 10 players
    top_players_info = Player.objects.order_by('-player_score')[:10]
    
    # Generating 100 random words
    origin_text = _load_words()

    returner = render(request, 'gameplay.html', {'playerInfoForm': playerInfoForm, 'leaderboard': top_players_info, 'originText': str(origin_text)})

    if request.method == 'POST':
        playerInfoForm = PlayerInfo(request.POST)
        if playerInfoForm.is_valid():
            playerInfoForm.save(commit=True)
            return returner
    else:
        print("not saved")
        playerInfoForm = PlayerInfo()

    return returner