from django.urls import path
from .views import PostList, PostDetail, PostListDetailFilter, CreatePost, AdminPostDetail, EditPost, DeletePost

# from .views import PostList
# from rest_framework.routers import DefaultRouter

app_name = 'my_site_api'

urlpatterns = [
    # path('post/<str:pk>/', PostDetail.as_view(), name='detailcreate'),
    path('search/', PostListDetailFilter.as_view(), name='detailcreate'),
    path('detail/', PostDetail.as_view(), name='detailcreatee'),
    path('', PostList.as_view(), name='listcreate'),
    path('admin/create/', CreatePost.as_view(), name='createpost'),
    path('admin/edit/postdetail/<int:pk>/', AdminPostDetail.as_view(), name='admindetailpost'),
    path('admin/edit/<int:pk>/', EditPost.as_view(), name='editpost'),
    path('admin/delete/<int:pk>/', DeletePost.as_view(), name='deletepost'),



]

# router = DefaultRouter()
# router.register('', PostList, basename='user')
# urlpatterns = router.urls
