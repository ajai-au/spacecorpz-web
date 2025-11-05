import os
from django.core.mail import send_mail
from threading import Thread
from django.conf import settings
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail,Content


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
