from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def home_view(request):
    # context = {
    #     'posts': Post.objects.all()
    # }
    return render(request, 'index.html')
    # return render(request, 'blog/home.html', context)


def gallery_view(request):
    # context = {
    #     'posts': Post.objects.all()
    # }
    return render(request, 'gallery.html')


def news_view(request):
    # context = {
    #     'posts': Post.objects.all()
    # }
    return render(request, 'news.html')



def faq_view(request):
    # context = {
    #     'posts': Post.objects.all()
    # }
    return render(request, 'faq.html')

def contact_view(request):
    # context = {
    #     'posts': Post.objects.all()
    # }
    return render(request, 'contact.html')