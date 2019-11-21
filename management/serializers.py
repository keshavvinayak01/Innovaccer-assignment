from rest_framework import serializers as sz
from management.views import Visitor

class CreateVisitor(sz.ModelSerializer):
    class Meta:
        model = Visitor
        fields = (
            'full_name',
            'email',
            'phone',
            'check_out_time',
        )