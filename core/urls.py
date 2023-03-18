from django.contrib import admin
from django.urls import path, include
from rest_framework.schemas import get_schema_view
from rest_framework.documentation import include_docs_urls
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('my_site.urls', namespace='my_site')),
    path('api/', include('my_site_api.urls', namespace='my_site_api')),
    path('api/user/', include('users.urls', namespace='users')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('docs/', include_docs_urls(title="My_Site")),
    path('schema', get_schema_view(
        title="My_Site",
        description="API for the My_Site_API",
        version='1.0.0'
    ), name='openapi-schema'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
