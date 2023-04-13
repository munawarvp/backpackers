from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from .serializers import LocationSerializer, ResortSerializer
from .models import Location, Resorts
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import viewsets


# Create your views here.

class LocationList(ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class ResortList(ListCreateAPIView):
    serializer_class = ResortSerializer
    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        # print(user_id)
        queryset = Resorts.objects.filter(owner=user_id).filter(is_approved=True)
        return queryset
    
class CreateResort(APIView):
    parser_classes = (MultiPartParser, FormParser)
    def post(self, request, format=None):
        print(request.data)
        serializer = ResortSerializer(data=request.data)

        print(serializer.is_valid())
        if serializer.is_valid(raise_exception=True):
            resort = serializer.save()

        return Response({'msg':'Registration Success'})
    


# use this view for both creating resort and listing resort in super admin panel
class ListResorts(viewsets.ModelViewSet):
    queryset = Resorts.objects.all()
    serializer_class = ResortSerializer

    def create(self, request, *args, **kwargs):
        serializer = ResortSerializer(data=request.data)
        print(request.data)
        print(serializer.is_valid())
        # print(serializer.error_messages)
        if serializer.is_valid():
            serializer.save()
        # print the data that was passed in the request
            print('created')
            # print(serializer.data)
            return Response(serializer.data)
        else:
            return Response({'msg': "Not created"})
        


class ListPendingResort(APIView):
    def get(self, request):
        queryset = Resorts.objects.filter(is_approved=False)
        serializer = ResortSerializer(queryset, many=True)
        return Response(serializer.data)
    

class BlockResort(APIView):
    def get(self, request, pk):
        resort = Resorts.objects.get(id=pk)
        resort.is_approved = not resort.is_approved
        resort.save()

        return Response({'msg': resort.is_approved})