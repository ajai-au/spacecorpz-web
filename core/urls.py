from django.urls import path
from .views import (
    home_view,gallery_view,
    news_view,faq_view,
    contact_view,solar_system_view,
    solar_system_testview
)
from . import views

urlpatterns = [
    path('', home_view, name='home'),
    path('gallery', gallery_view, name='gallery-page'),
    path('news', news_view, name='news-page'),
    path('faq', faq_view, name='faq-page'),
    path('contact', contact_view, name='contact-page'),
    path('solar_system', solar_system_view, name='solar_system_page'),
    path('solar_system_test', solar_system_testview, name='solar_test_page'),


]
