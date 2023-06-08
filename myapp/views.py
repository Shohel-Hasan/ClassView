from django.shortcuts import render
from myapp.models import *
from django.http import JsonResponse

# Create your views here.

def home(request):
    query = Product.objects.all()
    category = Category.objects.all()
    brand = Brand.objects.all()
    context = {
        'products': query,
        'categories': category,
        'brands': brand
    }
    return render(request, template_name='home.html', context=context)


def search(request):
    query_set = Product.objects.all()
    category_name = request.GET.get('category_name')
    brand_name = request.GET.getlist('brand_names[]')
    min_price = request.GET.get('min_price')
    max_price = request.GET.get('max_price')

    query = ''

    if category_name:
        query = query_set.filter(category__category__category_name__iexact=category_name.strip())

    if brand_name:
        query = query_set.filter(brand__brand_name__in=brand_name)

    if min_price and max_price:
        query = query_set.filter(price__gte=min_price, price__lte=max_price)

    if min_price:
        query = query_set.filter(price__gte=min_price)

    if max_price:
        query = query_set.filter(price__lte=max_price)


    product_data = []
    if query:
        for data in query:
            product_details = {
                'id': data.product_id,
                'title': data.title,
                'price': data.price,
                'description': data.desc,
                'brand': data.brand.brand_name,
                'sub_cat': data.category.sub_ca_name,
                'cat': data.category.category.category_name,
                'image': data.image_url
            }
            product_data.append(product_details)
    return JsonResponse({"products": product_data})
