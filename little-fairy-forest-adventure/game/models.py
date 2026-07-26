from django.db import models

class PlayerProfile(models.Model):
    name = models.CharField(max_length=50, default='Emily')
    avatar = models.CharField(max_length=20, default='golden')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Princess {self.name} ({self.avatar})"


class GameProgress(models.Model):
    player = models.OneToOneField(PlayerProfile, on_delete=models.CASCADE, related_name='progress')
    current_screen = models.CharField(max_length=30, default='start')
    map_pieces_collected = models.JSONField(default=list)  # e.g., [1, 2, 3]
    unlocked_phases = models.JSONField(default=lambda: [1])
    quiz_score = models.IntegerField(default=0)
    music_enabled = models.BooleanField(default=True)
    sfx_enabled = models.BooleanField(default=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Progress for {self.player.name} - Pieces: {len(self.map_pieces_collected)}"


class AnimalFact(models.Model):
    name = models.CharField(max_length=50)
    diet = models.CharField(max_length=20, choices=[('Herbivore', 'Herbivore'), ('Carnivore', 'Carnivore')])
    habitat = models.CharField(max_length=50)
    baby_name = models.CharField(max_length=50)
    fact = models.TextField()

    def __str__(self):
        return self.name
