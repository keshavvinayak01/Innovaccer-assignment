from celery.decorators import task
from celery.utils.log import get_task_logger
from datetime import datetime, timedelta
from django.core.mail import send_mail
from django.conf import settings
from json import loads
from django.contrib.auth.models import User
from global_config import get_global_config

active_config = get_global_config()
# Download the helper library from https://www.twilio.com/docs/python/install
from twilio.rest import Client

logger = get_task_logger(__name__)

@task(name = "send_email")
def send_alert(visitor, host, recipient):
    client = Client(active_config['TWILIO']['ACCOUNT_SID'], active_config['TWILIO']['AUTH_TOKEN'])
    visitor = loads(visitor)[0]['fields']
    host = loads(host)[0]['fields']
    host_user = User.objects.get(pk = host['user'])
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
            visitor['full_name'],
            visitor['email'],
            visitor['phone'],
            visitor['check_in_time'],
            visitor['check_out_time'],
            host_user.first_name + ' ' + host_user.last_name,
            host['address']
        )
        subject = "You have a new visitor!"
        mail_to = [host_user.email]
        phone_to = host['phone']
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
            visitor['full_name'],
            visitor['phone'],
            visitor['check_in_time'],
            visitor['check_out_time'],
            host_user.first_name + ' ' + host_user.last_name,
            host['address']
        )
        phone_to = visitor['phone']
        subject = "Your Visit with us"
        mail_to = [visitor['email']]

    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        mail_to
    )
    client.messages.create(
        body = message,
        from_ = active_config['TWILIO']['FROM'], 
        to = phone_to 
    )