from django.urls import path
from django.contrib.auth import views as auth_view
from . import views

urlpatterns = [
    path('', views.dashboard, name='dashboard'),

    # login and logout urls
    path('login/', auth_view.LoginView.as_view(template_name='account/login.html'), name='login'),
    path('logout/', auth_view.LogoutView.as_view(template_name='account/logout.html'), name='logout'),

    # password change urls
    path('password_change/', auth_view.PasswordChangeView.as_view(template_name='account/password_change_form.html'), name='password_change'),
    path('password_change/done', auth_view.PasswordChangeDoneView.as_view(template_name='account/password_change_done.html'), name='password_change_done'),

    # password reset urls
    path('password_reset/', auth_view.PasswordResetView.as_view(template_name='account/password_reset_form.html'), name='password_reset'),
    path('password_reset/done/', auth_view.PasswordResetDoneView.as_view(template_name='account/password_reset_done.html'), name='password_reset_done' ),
    path('reset/<uidb64>/<token>/', auth_view.PasswordResetConfirmView.as_view(template_name='account/password_reset_email.html'), name='password_reset_confirm'),
    path('reset/done/', auth_view.PasswordResetCompleteView.as_view(template_name='account/password_reset_complete.html'), name='password_reset_complete')



    



]
