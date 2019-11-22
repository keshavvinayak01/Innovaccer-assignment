from rest_framework import serializers as sz
from management.models import Visitor, Host
from django.db import transaction
from management.tasks import send_alert
from datetime import datetime
from django.core import serializers 

@transaction.atomic
class CreateVisitorSerializer(sz.ModelSerializer):
    def create(self, validated_data):
        free_host = Host.objects.filter(available = True)[0]
        visitor = Visitor.objects.create(
            full_name = validated_data['full_name'],
            email = validated_data['email'],
            phone = validated_data['phone'],
            check_out_time = validated_data['check_out_time'],
            host = free_host
        )
        visitor.save()
        send_alert.apply_async(
            args=[
                serializers.serialize('json', [visitor]), 
                serializers.serialize('json', [free_host]), 
                "Host"
            ], 
            eta = datetime.now()
        )
        send_alert.apply_async(
            args=[
                serializers.serialize('json', [visitor]), 
                serializers.serialize('json', [free_host]), 
                "Visitor"
            ], 
            eta = visitor.check_out_time
        )
        return visitor
    class Meta:
        model = Visitor
        fields = (
            'full_name',
            'email',
            'phone',
            'check_out_time',
        )