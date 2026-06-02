from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Category, Comment
from .serializers import PostSerializer, CategorySerializer, CommentSerializer


@api_view(['GET'])
def getPosts(request):
    category = request.query_params.get('category', '')
    if category:
        posts = Post.objects.filter(published=True, category__slug=category)
    else:
        posts = Post.objects.filter(published=True)
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getPost(request, slug):
    post = Post.objects.get(slug=slug)
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getCategories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addComment(request, slug):
    user = request.user
    post = Post.objects.get(slug=slug)
    data = request.data

    Comment.objects.create(
        post=post,
        user=user,
        name=user.first_name or user.email,
        content=data['content'],
    )
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data)