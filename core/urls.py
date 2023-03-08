from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('my_site.urls', namespace='my_site')),
    path('api/', include('my_site_api.urls', namespace='my_site_api')),
]
