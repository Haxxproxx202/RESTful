# from django.urls import path
# from .views import PostList, PostDetail
from .views import PostList
from rest_framework.routers import DefaultRouter
app_name = 'my_site_api'

# urlpatterns = [
#     path('<int:pk>', PostDetail.as_view(), name='detailcreate'),
#     path('', PostList.as_view(), name='listcreate')
# ]

router = DefaultRouter()
router.register('', PostList, basename='user')
urlpatterns = router.urls
