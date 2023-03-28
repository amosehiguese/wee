from django.urls import path
from django.contrib.auth import views as auth_view
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),
    path('login/', auth_view.LoginView.as_view(template_name='account/login.html'), name='login'),
    path('logout/', auth_view.LogoutView.as_view(template_name='account/logout.html'), name='logout'),
    



]
