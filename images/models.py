from django.db import models
from django.utils.text import slugify

from account.models import user

class Image(models.Model):
    user = models.ForeignKey(user, related_name='images_created', on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, blank=True)
    url = models.URLField()
    image = models.ImageField(upload_to='images/%Y/%m/%d')
    description = models.TextField(blank=True)
    created = models.DateField(auto_now_add=True, db_index=True)

    def save(self, *args, **kwargs):
      if not self.slug:
          self.slug = slugify(self.title)
      super().save(*args, **kwargs)

    def __str__(self):
      return self.title