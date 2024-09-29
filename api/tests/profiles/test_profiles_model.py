import pytest
from profiles.models import Profile

@pytest.mark.django_db
class TestProfileModel:

    def test_create_profile(self):
        profile = Profile.objects.create(attributes=["Skill1", "Skill2"])
        assert profile.id is not None
        assert profile.attributes == ["Skill1", "Skill2"]

    def test_profile_string_representation(self):
        profile = Profile.objects.create(attributes=["Skill1"])
        assert str(profile) == str(profile.id)