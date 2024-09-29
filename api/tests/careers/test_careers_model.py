import pytest
from careers.models import Career

@pytest.mark.django_db
class TestCareerModel:

    def test_create_career(self):
        career = Career.objects.create(
            title='Software Engineer',
            shortDescription='Develops software applications.',
            longDescription1='Involves coding, testing, and maintaining software.',
            longDescription2='Collaborates with team members and stakeholders.',
            longDescription3='Participates in code reviews and team meetings.',
            longDescription4='Learns and applies new technologies.',
            longDescription5='Adapts to changing project requirements.',
            skills=['Python', 'Django', 'JavaScript']
        )
        assert career.title == 'Software Engineer'
        assert career.skills == ['Python', 'Django', 'JavaScript']

    def test_unique_title(self):
      Career.objects.create(
          title='Data Scientist',
          shortDescription='Analyzes data to inform business decisions.',
          longDescription1='Uses statistical analysis and machine learning.',
          longDescription2='Visualizes data and communicates findings.',
          longDescription3='Collaborates with cross-functional teams.',
          longDescription4='Builds predictive models.',
          longDescription5='Stays updated on industry trends.',
          skills=['Python', 'R', 'SQL']
      )
      with pytest.raises(Exception) as excinfo:
          Career.objects.create(
              title='Data Scientist',
              shortDescription='Another description.',
              longDescription1='Another long description.',
              longDescription2='Another long description.',
              longDescription3='Another long description.',
              longDescription4='Another long description.',
              longDescription5='Another long description.',
              skills=['New Skill']
          )
      
      assert 'duplicar valor da chave viola a restrição de unicidade' in str(excinfo.value)

    def test_career_str_method(self):
        career = Career.objects.create(
            title='Product Manager',
            shortDescription='Oversees product development.',
            longDescription1='Responsible for product vision and strategy.',
            longDescription2='Works with engineers and designers.',
            longDescription3='Conducts market research.',
            longDescription4='Defines product roadmap.',
            longDescription5='Measures product success.',
            skills=['Leadership', 'Communication']
        )
        assert str(career) == f"{career.id} - Product Manager"
