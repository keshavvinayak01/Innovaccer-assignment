from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Host(models.Model):
    user = models.OneToOneField(User, on_delete = models.CASCADE)
    phone = models.CharField(max_length = 12)
    ADDRESS_CHOICES = [
        ("Noida HQ", "<random_address1>"),
        ("Bangalore","<random_address2>")
    ]
    address = models.CharField(
        choices = ADDRESS_CHOICES,
        max_length = 100,
        default = "Noida HQ"
    )
    available = models.BooleanField(default = True)

class Visitor(models.Model):
    full_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=12)
    check_in_time = models.DateTimeField(auto_now_add=True, blank = True)
    check_out_time = models.TimeField()
    host = models.OneToOneField(Host, on_delete = models.CASCADE, related_name="host")

@receiver(post_save, sender = User)
def create_host(sender, instance, created, **kwargs):
    if created:
        Host.objects.create(user = instance, phone = "000000000")

@receiver(post_save, sender = User)
def save_user_profile(sender, instance , **kwargs):
    instance.profile.save()