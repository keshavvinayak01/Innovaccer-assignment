from rest_framework import serializers as sz
from management.models import Visitor, Host
from django.db import transaction

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
        return visitor
    class Meta:
        model = Visitor
        fields = (
            'full_name',
            'email',
            'phone',
            'check_out_time',
        )