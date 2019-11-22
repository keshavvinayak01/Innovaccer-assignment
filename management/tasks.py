from celery.decorators import task
from celery.utils.log import get_task_logger
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.conf import settings

logger = get_task_logger(__name__)

@task(name = "send_email")
def send_email(visitor, host, recipient):
    if recipient == "Host" :
        message = """
        You have a new visitor ! here are the details : 
        
        Visitor name : {}
        Visitor email : {}
        Visitor Contact number : {}
        Visitor Check in time : {}
        Visitor Check out time : {}
        Host name : {}
        Address visited : {}
        """.format(
            visitor.full_name,
            visitor.email,
            visitor.phone,
            visitor.check_in_time,
            visitor.check_out_time,
            host.user.first_name + ' ' + host.user.last_name,
            host.address
        )
        subject = "You have a new visitor!"
        mail_to = [host.email]
    else :
        message = """
        Thanks for visiting us! Here are your visit details : 
        
        Your name : {}
        Your Contact number : {}
        Your Check in time : {}
        Your Check out time : {}
        Your Host : {}
        Address visited : {}
        """.format(
            visitor.full_name,
            visitor.phone,
            visitor.check_in_time,
            visitor.check_out_time,
            host.user.first_name + ' ' + host.user.last_name,
            host.address
        )
        subject = "Your Visit with us"
        mail_to = [visitor.email]

    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        mail_to
    )