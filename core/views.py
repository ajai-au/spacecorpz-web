from django.http import HttpResponse
from .forms import CollaborationForm
from django.core.mail import send_mail
from django.conf import settings
from django.shortcuts import render, redirect
from django.urls import reverse
from django.core.paginator import Paginator
from django.contrib.sitemaps import Sitemap

from .models import News
from .send_mail import send_async_email
# Create your views here.


def home_view(request):

	return render(request, 'index.html')


def gallery_view(request):

	return render(request, 'gallery.html')


def news_view(request):
	news_list = News.objects.all()
	paginator = Paginator(news_list, 5)  # 6 articles per page
	page_number = request.GET.get('page')
	page_obj = paginator.get_page(page_number)
	return render(request, 'news.html', {'page_obj': page_obj})


def faq_view(request):

	return render(request, 'faq.html')


def contact_view(request):

	if request.method == "POST":
		full_name = request.POST.get("name")
		email_contact = request.POST.get("email")
		mobile = request.POST.get("phone")
		message = request.POST.get("message")
		mode = request.POST.get("mode")
		preferred_datetime = request.POST.get("preferred_datetime")


		subject = f" Contact or Appointment Request from {full_name}"
		body = f"""
		Hello Team SPACECORPZ AEROSPACE,

		I wish to connect with SPACECORPZ AEROSPACE PRIVATE LIMITED for an appointment or enquiry. Please find my details below for your reference.
		
		Full Name: {full_name}
		Email Address: {email_contact}
		Mobile Number: {mobile}
		Purpose of Contact: {message}
		Preferred Mode: {mode}
		Preferred Date & Time: {preferred_datetime}

		I’ll be happy to share any further information if required. Looking forward to your response.

		Thanks & Regards,
		{full_name}
		{email_contact}
		"""
		recipient = settings.EMAIL_RECIPIENT

		try:
			send_async_email(subject, body, recipient)
			# Redirect with success flag
			url = reverse("contact-page") 
			form = CollaborationForm()
			return redirect(f"{url}?success=1")

		except Exception as e:
			print("Email sending failed:", e)

		return render(request, "contact.html", {"error": "Email sending failed. Please try again."})

	return render(request, 'contact.html')


def solar_system_view(request):
	return render(request, 'solar_system.html')


def solar_system_testview(request):

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
			subject = f"Collaboration request from {data['name']}"
			body = f"""
					Hello Team SPACECORPZ AEROSPACE,

					I came across your work & I’m really interested in collaborating with you.
					Here are my details below.

					Name:{data['name']}
					Company / Organisation: {data['company']}
					Email & Contact: {data['email']}
					Area of Collaboration: {data['interest']}
					Message: {data['message']}

					Please have a look & let me know if we can connect for a discussion.

					Thanks & Regards,
					{data['name']}
					{data['company']}
				"""
			recipient = settings.EMAIL_RECIPIENT
			try:
				send_async_email(subject, body, recipient)
				# Redirect with success flag
				url = reverse("industry_collaborations_page") 
				form = CollaborationForm()
				return redirect(f"{url}?success=1")

			except Exception as e:
				print("Email sending failed:", e)

			return render(request, "industry_collaborations.html", {"error": "Email sending failed. Please try again."})
	else:
		form = CollaborationForm()

	return render(request, 'industry_collaborations.html', {"success": success})



def careers_view(request):
	if request.method == "POST":
		full_name = request.POST.get("full_name")
		email_contact = request.POST.get("email_contact")
		mobile = request.POST.get("contact")
		qualification = request.POST.get("qualification")
		interest = request.POST.get("interest")
		experience = request.POST.get("experience")
		reason = request.POST.get("reason")


		subject = f"Job Application from {full_name}"
		body = f"""
		Dear SPACECORPZ AEROSPACE Team,

		I’m interested in exploring a career opportunity at SPACECORPZ AEROSPACE PRIVATE LIMITED.Please find my details below for your review.

		Name: {full_name}
		Contact: {email_contact}
		Mobile Number: {mobile}
		Qualification: {qualification}
		Area of Interest: {interest}
		Experience: {experience}
		Reason to Join: {reason}

		I’ll be happy to share any further information if required. Looking forward to your response.

		Thanks & Regards,
		{full_name}
		{email_contact}
		"""
		recipient = settings.EMAIL_RECIPIENT
		try:

			send_async_email(subject, body, recipient)
			# Redirect with success flag
			url = reverse("careers_page") 
			return redirect(f"{url}?success=1")

		except Exception as e:
			print("Email sending failed:", e)

		return render(request, "careers.html", {"error": "Email sending failed. Please try again."})

	return render(request, "careers.html")



def investor_relation_view(request):

	return render(request, 'investor-relations.html')


def test_view(request):

	return render(request, 'test.html')


class StaticViewSitemap(Sitemap):
    def items(self):
        return ['home', 'news-page', 'contact-page','about_us_page','product_service_page','industry_collaborations_page',
				'careers_page','investor_relation_page']  # names of URL patterns

    def location(self, item):
        return reverse(item)