from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_view, name='index'),
    path('api/save-game/', views.save_progress_api, name='save_game'),
    path('api/load-game/', views.load_progress_api, name='load_game'),
    path('api/reset-game/', views.reset_progress_api, name='reset_game'),
]
