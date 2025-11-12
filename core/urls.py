from django.urls import path
from .views import (
    home_view,gallery_view,
    news_view,faq_view,
    contact_view,solar_system_view,
    solar_system_testview,about_us_view,
    product_service_view,industry_collaborations_view,
    careers_view,investor_relation_view,
    test_view,StaticViewSitemap
)
from . import views
from django.conf.urls.static import static
from django.conf import settings
from django.contrib.sitemaps.views import sitemap
from django.views.generic import RedirectView


sitemaps = {
    'static': StaticViewSitemap,
    # 'posts': PostSitemap,   
}


urlpatterns = [
    path('', home_view, name='home'),
    path('news', news_view, name='news-page'),
    path('contact', contact_view, name='contact-page'),
    path('about_us', about_us_view, name='about_us_page'),
    path('product_service', product_service_view, name='product_service_page'),
    path('industry_collaborations', industry_collaborations_view, name='industry_collaborations_page'),
    path('careers', careers_view, name='careers_page'),
    path('investor_relation', investor_relation_view, name='investor_relation_page'),
    
    path('favicon.ico', RedirectView.as_view(url='/static/favicon_ico.ico',permanent=True)),


    path('gallery', gallery_view, name='gallery-page'),
    path('test', test_view, name='test'),
    path('faq', faq_view, name='faq-page'),
    path('solar_system', solar_system_view, name='solar_system_page'),
    path('solar_system_test', solar_system_testview, name='solar_test_page'),
    path('sitemap.xml', sitemap, {'sitemaps': sitemaps}, name='sitemap'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
