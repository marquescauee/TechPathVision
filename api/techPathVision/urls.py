from django.urls import re_path, path
from auth import views as auth_views
from users import views as user_views
from attributes import views as attributes_views
from roadmaps import views as roadmaps_views
from profiles import views as profile_views

urlpatterns = [
    re_path('login', auth_views.login),
    re_path('signup', auth_views.signup),
    re_path('validate-token', auth_views.validate_token),
    re_path('update-user', user_views.update_user),
    re_path('get-user', user_views.get_user),

    re_path('get-attributes', attributes_views.get_attributes),
    re_path('send-attributes', attributes_views.send_attributes),

    path('password-reset-request', auth_views.password_reset_request, name='password_reset_request'),
    path('password-reset-confirm/<uuid:token>', auth_views.password_reset_confirm, name='password_reset_confirm'),

    re_path('map-profile', profile_views.map_profile),
    re_path('generate-roadmap', roadmaps_views.generate_roadmap),

    re_path('save-roadmap', roadmaps_views.save_roadmap),
    re_path('generate-subject-content', roadmaps_views.generate_subject_content),
    re_path('get-roadmaps', roadmaps_views.get_roadmaps),
]
