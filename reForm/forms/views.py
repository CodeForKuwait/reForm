from django.http import HttpResponse

def home_page(request):
    return HttpResponse('<html><title>Welcome to reForm</title></html>')
