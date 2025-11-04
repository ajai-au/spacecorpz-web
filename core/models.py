from django.db import models

# Create your models here.
class News(models.Model):
    CATEGORY_CHOICES = [
        ('technology', 'Technology'),
        ('industry', 'Industry News'),
        ('company', 'Company Updates'),
        ('tutorial', 'Tutorials'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    image = models.ImageField(upload_to='news_images/')
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title