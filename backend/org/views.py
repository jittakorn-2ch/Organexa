from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from org.models import Company
from org.serializers import CompanySerializer


class CompanyListCreateAPIView(generics.ListCreateAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    arser_classes = (MultiPartParser, FormParser, JSONParser)
 

class CompanyRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
