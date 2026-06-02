from django.urls import path
from . import views

urlpatterns = [
    path('', views.getPosts, name='posts'),
    path('categories/', views.getCategories, name='categories'),
    path('<str:slug>/', views.getPost, name='post'),
    path('<str:slug>/comments/', views.addComment, name='add-comment'),
]