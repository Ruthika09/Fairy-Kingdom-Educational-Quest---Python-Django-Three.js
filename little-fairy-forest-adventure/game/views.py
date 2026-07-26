import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import PlayerProfile, GameProgress

def index_view(request):
    """
    Renders the main single-page visual novel game interface.
    """
    return render(request, 'game/index.html', {
        'title': 'Little Fairy Forest Adventure',
    })

@csrf_exempt
def save_progress_api(request):
    """
    Saves or updates player progress into Django session / SQLite database.
    """
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            player_name = data.get('playerName', 'Emily')
            avatar = data.get('playerAvatar', 'golden')

            profile, _ = PlayerProfile.objects.get_or_create(
                id=request.session.get('player_id'),
                defaults={'name': player_name, 'avatar': avatar}
            )
            profile.name = player_name
            profile.avatar = avatar
            profile.save()

            request.session['player_id'] = profile.id

            progress, _ = GameProgress.objects.get_or_create(player=profile)
            progress.current_screen = data.get('screen', 'start')
            progress.map_pieces_collected = data.get('collectedMapPieces', [])
            progress.unlocked_phases = data.get('unlockedPhases', [1])
            progress.quiz_score = data.get('quizScore', 0)
            progress.music_enabled = data.get('musicEnabled', True)
            progress.sfx_enabled = data.get('sfxEnabled', True)
            progress.save()

            return JsonResponse({'status': 'success', 'player_id': profile.id})
        except Exception as e:
            return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

    return JsonResponse({'status': 'invalid method'}, status=405)


def load_progress_api(request):
    """
    Loads saved progress for current session.
    """
    player_id = request.session.get('player_id')
    if not player_id:
        return JsonResponse({'status': 'not_found'})

    try:
        profile = PlayerProfile.objects.get(id=player_id)
        progress = GameProgress.objects.get(player=profile)
        return JsonResponse({
            'status': 'success',
            'data': {
                'playerName': profile.name,
                'playerAvatar': profile.avatar,
                'screen': progress.current_screen,
                'collectedMapPieces': progress.map_pieces_collected,
                'unlockedPhases': progress.unlocked_phases,
                'quizScore': progress.quiz_score,
                'musicEnabled': progress.music_enabled,
                'sfxEnabled': progress.sfx_enabled,
            }
        })
    except (PlayerProfile.DoesNotExist, GameProgress.DoesNotExist):
        return JsonResponse({'status': 'not_found'})


@csrf_exempt
def reset_progress_api(request):
    """
    Resets Django session progress.
    """
    request.session.flush()
    return JsonResponse({'status': 'reset_complete'})
