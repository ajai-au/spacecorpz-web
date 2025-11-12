from django.db import models
from storages.backends.s3boto3 import S3Boto3Storage
from django.urls import reverse


# Create your models here.

class PublicMediaStorage(S3Boto3Storage):
    location = 'media'
    default_acl = None  
    file_overwrite = False


class News(models.Model):
    CATEGORY_CHOICES = [
        ('technology', 'Technology'),
        ('industry', 'Industry News'),
        ('company', 'Company Updates'),
        ('tutorial', 'Tutorials'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    image = models.FileField(storage=PublicMediaStorage(),default=None)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
    
    # def get_absolute_url(self):
    #     # assuming your URL pattern name is 'news_detail'
    #     return reverse('news-page', args=[self.slug])

    def __str__(self):
        return self.title