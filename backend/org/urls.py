from django.urls import path

from org.views import CompanyListCreateAPIView, CompanyRetrieveUpdateDestroyAPIView

app_name = "org"

urlpatterns = [
    path("companies/", CompanyListCreateAPIView.as_view(), name="company-list-create"),
    path("companies/<str:pk>/", CompanyRetrieveUpdateDestroyAPIView.as_view(), name="company-detail"),
]