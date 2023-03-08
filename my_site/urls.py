from django.urls import path
from django.views.generic import TemplateView

app_name = 'my_site'

urlpatterns = [
    path('', TemplateView.as_view(template_name="my_site/index.html")),
]
