from django.shortcuts import render
from django.http import HttpResponse
from .forms import CollaborationForm
from django.core.mail import send_mail
from django.conf import settings

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

def solar_system_view(request):
    # context = {
    #     'posts': Post.objects.all()
    # }
    return render(request, 'solar_system.html')

def solar_system_testview(request):
    # context = {
    #     'posts': Post.objects.all()
    # }
    return render(request, 'solar_test.html')

def about_us_view(request):

    return render(request, 'about_us.html')



def product_service_view(request):

    return render(request, 'product_service.html')



def industry_collaborations_view(request):

    success = False
    if request.method == 'POST':
        form = CollaborationForm(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            print(data)
            # subject = f"New Collaboration Request from {data['name']}"
            # message = (
            #     f"Name: {data['name']}\n"
            #     f"Company: {data['company']}\n"
            #     f"Email: {data['email']}\n"
            #     f"Interest Area: {data['interest']}\n\n"
            #     f"Message:\n{data['message']}"
            # )
            # send_mail(
            #     subject,
            #     message,
            #     settings.DEFAULT_FROM_EMAIL,
            #     ['info@spacecorpz.in'],  # your receiving email
            # )
            # success = True
            # form = CollaborationForm()  # reset form after success
    else:
        form = CollaborationForm()

    return render(request, 'industry_collaborations.html', {'form': form, 'success': success})



def careers_view(request):
    if request.method == "POST":
        full_name = request.POST.get("full_name")
        email_contact = request.POST.get("email_contact")
        qualification = request.POST.get("qualification")
        interest = request.POST.get("interest")
        experience = request.POST.get("experience")
        reason = request.POST.get("reason")

        message = f"""
        New Career Application Submitted:
        
        Name: {full_name}
        Contact: {email_contact}
        Qualification: {qualification}
        Area of Interest: {interest}
        Experience: {experience}
        Reason to Join: {reason}
        """

        # send_mail(
        #     subject=f"New Career Application from {full_name}",
        #     message=message,
        #     from_email=settings.DEFAULT_FROM_EMAIL,
        #     recipient_list=["your_email@spacecorpz.in"],
        # )

    return render(request, "careers.html")



def investor_relation_view(request):

    return render(request, 'investor-relations.html')