from django.db import models
from django.utils.text import slugify
# Create your models here.


class Category(models.Model):
    category_id = models.CharField(max_length=255, blank=True)
    category_name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.category_name

class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, blank=True)
    sub_cat_id = models.CharField(max_length=255, blank=True)
    sub_ca_name = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.sub_ca_name

class Brand(models.Model):
    brand_id = models.CharField(max_length=255,blank=True)
    brand_name = models.CharField(max_length=255,blank=True)

    def __str__(self):
        return self.brand_name


class Product(models.Model):
    product_id = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255, blank=True)
    price = models.FloatField()
    desc = models.TextField(blank=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, blank=True )
    category = models.ForeignKey(SubCategory, on_delete=models.CASCADE, blank=True )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    slug = models.SlugField(blank=True)
    image_url = models.URLField(blank=True)


    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super().save(*args, **kwargs)



