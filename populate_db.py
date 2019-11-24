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
    for i in range(10):
        User.objects.create(
            username = usernames[i],
            email = emails[i],
            first_name = first_names[i],
            last_name = last_names[i]
        )

if __name__ == "__main__":
    add_hosts()