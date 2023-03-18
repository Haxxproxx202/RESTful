from rest_framework import generics
from my_site.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import SAFE_METHODS, IsAdminUser, DjangoModelPermissions, BasePermission, \
    IsAuthenticatedOrReadOnly, IsAuthenticated, AllowAny

from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework import filters


class PostUserWritePermission(BasePermission):
    message = 'Editing posts is restricted to the author only'

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        return obj.author == request.user


# class PostList(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     serializer_class = PostSerializer
#     queryset = Post.postobjects.all()
#
#     def get_object(self, queryset=None, **kwargs):
#         item = self.kwargs.get('pk')
#         # Define custom Queryset
#         return get_object_or_404(Post, slug=item)
#
#     # Define custom Queryset
#     def get_queryset(self):
#         return Post.objects.all()


# ----------------------------------------------------------------------
# class PostList(viewsets.ViewSet):
#     permission_classes = [IsAuthenticated]
#     queryset = Post.postobjects.all()
#
#     def list(self, request):
#         serializer_class = PostSerializer(self.queryset, many=True)
#         return Response(serializer_class.data)
#
#     def retrieve(self, request, pk=None):
#         post = get_object_or_404(self.queryset, pk=pk)
#         serializer_class = PostSerializer(post)
#         return Response(serializer_class.data)

# ---------------------------------------------------------------------
#
class PostList(generics.ListAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    # permission_classes = [IsAuthenticated]
    queryset = Post.postobjects.all()
    serializer_class = PostSerializer

    # def get_queryset(self):
    #     user = self.request.user
    #     return Post.objects.filter(author=user)


# class PostDetail(generics.RetrieveUpdateDestroyAPIView, PostUserWritePermission):
#     permission_classes = [PostUserWritePermission]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer
#
#     def get_object(self, queryset=None, **kwargs):
#         item = self.kwargs.get('pk')
#         return get_object_or_404(Post, slug=item)

    # def get_queryset(self):                --------- Działa tylko z ListAPIView
    #     slug = self.kwargs['pk']
    #     print(slug)
    #     return Post.objects.filter(slug=slug)

class PostDetail(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        slug = self.request.query_params.get('slug', None)
        print("To jest slug:", slug)
        return Post.objects.filter(slug=slug)


class PostListDetailFilter(generics.ListAPIView):

    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^slug']


# '^' Starts-with search.
# '=' Exact matches.
# '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
# '$' Regex search.

class CreatePost(generics.CreateAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class AdminPostDetail(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class EditPost(generics.UpdateAPIView):
    # permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class DeletePost(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer




    """ Concrete View Classes
    # CreateAPIView
    Used for create-only endpoints.
    # ListAPIView
    Used for read-only endpoints to represent a collection of model instances.
    # RetrieveAPIView
    Used for read-only endpoints to represent a single model instance.
    # DestroyAPIView
    Used for delete-only endpoints for a single model instance.
    # UpdateAPIView
    Used for update-only endpoints for a single model instance.
    # ListCreateAPIView
    Used for read-write endpoints to represent a collection of model instances.
    RetrieveUpdateAPIView
    Used for read or update endpoints to represent a single model instance.
    # RetrieveDestroyAPIView
    Used for read or delete endpoints to represent a single model instance.
    # RetrieveUpdateDestroyAPIView
    Used for read-write-delete endpoints to represent a single model instance.
    """
