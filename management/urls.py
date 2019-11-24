from django.urls import path
from management.views import CreateVisitorView

app_name = 'management'

urlpatterns = [
    path('create-visitor/', CreateVisitorView.as_view()),
]