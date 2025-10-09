from django.urls import path
from .views import (
    home_view,gallery_view,
    news_view,faq_view,
    contact_view
)
from . import views

urlpatterns = [
    path('', home_view, name='home'),
    path('gallery', gallery_view, name='gallery-page'),
    path('news', news_view, name='news-page'),
    path('faq', faq_view, name='faq-page'),
    path('contact', contact_view, name='contact-page'),



]
