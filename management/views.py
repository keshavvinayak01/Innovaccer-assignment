from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from management.models import *
from management.serializers import CreateVisitorSerializer
# Create your views here.

class CreateVisitorView(APIView):
    def post(self,request):
        visitor = request.data.get('data')
        if not visitor:
            return Response({'response' : 'error', 'message' : 'No data found'})
        if Host.objects.filter(available = True).count() == 0:
            return Response({"response" : "error", "message" : "No free Host available"})
        serializer = CreateVisitorSerializer(data = visitor)
        if serializer.is_valid():
            saved_user = serializer.save()
        else:
            return Response({"response" : "error", "message" : serializer.errors})
        return Response({"response" : "success", "message" : "Visitor added successfully"})