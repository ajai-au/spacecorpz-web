from django.core.mail import send_mail
from threading import Thread
from django.conf import settings


def send_async_email(subject, body, recipient):
    def _send():
        send_mail(
            subject=subject,
            message=body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=recipient,
            fail_silently=False,
        )
    Thread(target=_send).start()
