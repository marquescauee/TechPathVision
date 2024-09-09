from django.urls import re_path, path
from auth import views as auth_views
from users import views as user_views

urlpatterns = [
    re_path('login', auth_views.login),
    re_path('signup', auth_views.signup),
    re_path('validate-token', auth_views.validate_token),
    re_path('update-user', user_views.update_user),
    re_path('get-user', user_views.get_user),


    path('password-reset-request', auth_views.password_reset_request, name='password_reset_request'),
    path('password-reset-confirm/<uuid:token>', auth_views.password_reset_confirm, name='password_reset_confirm'),
]
