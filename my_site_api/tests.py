from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from my_site.models import Post, Category
from django.contrib.auth.models import User
from rest_framework.test import APIClient


class PostTest(APITestCase):

    def test_view_post(self):
        url = reverse('my_site_api:listcreate')
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_post(self):
        client = APIClient()
        self.test_category = Category.objects.create(name='django')

        self.testuser1 = User.objects.create_superuser(
            username='test_user1', password='123456789')
        client.login(username=self.testuser1.username,
                     password='123456789')

        data = {"title": "new", "author": 1,
                "excerpt": "new", "content": "new"}
        url = reverse('my_site_api:listcreate')
        response = client.post(url, data, format='json')
        # print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_post_update(self):
        client = APIClient()

        self.test_category = Category.objects.create(name='django')

        self.testuser1 = User.objects.create_user(
            username='test_user1', password='123456789')
        self.testuser2 = User.objects.create_user(
            username='test_user2', password='123456789')
        test_post = Post.objects.create(
            category_id=1, title='Post Title', excerpt='Post Excerpt', content='PostContent',
            slug='post-title', author_id=1, status='published'
        )

        client.login(username=self.testuser1.username,
                     password='123456789')

        url = reverse('my_site_api:detailcreate', kwargs={'pk': 1})

        response = client.put(
            url, {
                # "id": 1,
                "title": "new",
                "author": 1,
                "excerpt": "new",
                "content": "new",
                "status": "published"
            }, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


