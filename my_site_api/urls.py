from django.urls import path
from .views import PostList, PostDetail, PostListDetailFilter
# from .views import PostList
# from rest_framework.routers import DefaultRouter

app_name = 'my_site_api'

urlpatterns = [
    # path('post/<str:pk>/', PostDetail.as_view(), name='detailcreate'),
    path('search/', PostListDetailFilter.as_view(), name='detailcreate'),
    path('detail/', PostDetail.as_view(), name='detailcreatee'),
    path('', PostList.as_view(), name='listcreate')
]

# router = DefaultRouter()
# router.register('', PostList, basename='user')
# urlpatterns = router.urls
