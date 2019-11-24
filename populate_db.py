import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','innovaccer.settings')
import django
django.setup()

from django.contrib.auth.models import User
from management.models import *

def add_hosts():
    usernames = [f'host-{i}' for i in range(10)]
    emails = ['kvrox113@gmail.com']*10
    first_names = ['Ramesh']*10
    last_names = [f'Kumar_{i}' for i in range(10)]
    phone_numbers = ["+917678442691"]*10
    for i in range(10):
        new_user = User.objects.create(
            username = usernames[i],
            email = emails[i],
            first_name = first_names[i],
            last_name = last_names[i]
        )
        new_user.host.phone = phone_numbers[i]
        new_user.host.save()

if __name__ == "__main__":
    add_hosts()