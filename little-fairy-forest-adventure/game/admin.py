from django.contrib import admin
from .models import PlayerProfile, GameProgress, AnimalFact

@admin.register(PlayerProfile)
class PlayerProfileAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'avatar', 'created_at', 'updated_at')
    search_fields = ('name',)

@admin.register(GameProgress)
class GameProgressAdmin(admin.ModelAdmin):
    list_display = ('id', 'player', 'current_screen', 'quiz_score', 'updated_at')

@admin.register(AnimalFact)
class AnimalFactAdmin(admin.ModelAdmin):
    list_display = ('name', 'diet', 'habitat', 'baby_name')
    search_fields = ('name', 'habitat')
