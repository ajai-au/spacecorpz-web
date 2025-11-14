import os
from django.core.mail import send_mail
from threading import Thread
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail,Content
from django.core.mail import EmailMessage


def send_async_email(subject, body, recipient):

    def _send():
        message = Mail(
        from_email='support@spacecorpzaerospace.com',
        to_emails=recipient,
        subject=subject,
        )
        message.add_content(Content("text/plain", body))
        # message.add_content(Content("text/html", body))
        try:
            sg = SendGridAPIClient(os.environ.get('SENDGRID_API_KEY'))
            print(sg)
            # sg.set_sendgrid_data_residency("eu")
            # uncomment the above line if you are sending mail using a regional EU subuser
            response = sg.send(message)
            print(response.status_code)
        except Exception as e:
            print(e,'aaaaaaaaa')
            print(e.message)
    Thread(target=_send).start()



def send_async_send_email(subject, body, recipient,resume_file=None):

    def _send():
        email = EmailMessage(
            subject=subject,
            body=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[recipient]
        )
        if resume_file:
            email.attach(resume_file.name, resume_file.read(), resume_file.content_type)
        email.send(fail_silently=False)
    Thread(target=_send).start()
