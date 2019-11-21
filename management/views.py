from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from management.serializers import CreateVisitor
# Create your views here.

class CreateUserView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self,request):
        visitor = request.data.get('visitor')
        if not visitor:
            return Response({'response' : 'error', 'message' : 'No data found'})
        serializer = CreateVisitor(data = visitor)
        if serializer.is_valid():
            saved_user = serializer.save()
        else:
            return Response({"response" : "error", "message" : serializer.errors})
        return Response({"response" : "success", "message" : "Visitor added successfully"})