from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from rest_framework.filters import SearchFilter
from .serializers import LocationSerializer, ResortSerializer, AdventureSerializer, DestinationSerializer
from .models import Location, Resorts, Adventures, Destinations
from account.models import User
from rest_framework import viewsets


# ***views for staff admin***

class LocationList(ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

class ResortList(ListCreateAPIView):
    serializer_class = ResortSerializer
    def get_queryset(self):
        user_id = self.request.query_params.get('user_id')
        # print(user_id)
        queryset = Resorts.objects.filter(owner=user_id)
        return queryset
    
class CreateResort(APIView):
    def post(self, request, format=None):
        serializer = ResortSerializer(data=request.data)
        print(request.data)
        is_valid = serializer.is_valid()
        print(is_valid)

        if serializer.is_valid():
            serializer.save()
            print('at last hope')
        else :
            print('still no hope')
        
        return Response({'msg':'Registration Success'})
    
class SearchResorts(ListCreateAPIView):
    queryset = Resorts.objects.all()
    serializer_class = ResortSerializer
    filter_backends = [SearchFilter]
    search_fields = ['resort_name', 'place']

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
            return Response(serializer.data)
        else:
            return Response({'msg': "Not created"})
        

class StaffPendingResort(APIView):
    def get(self, request, id):
        queryset = Resorts.objects.filter(owner=id).filter(is_approved=False)
        serializer = ResortSerializer(queryset, many=True)
        return Response(serializer.data)

# ****adventure view****
class StaffAdventureList(APIView):
    def post(self, request):
        serializer = AdventureSerializer(data=request.data)
        print(serializer.is_valid())
        print(serializer.errors)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Adventure activity created'})
        return Response({'msg': 'something wrong'})
    
    def get(self, request, user_id=None):
        if user_id is not None:
            queryset = Adventures.objects.filter(owner=user_id)
            serializer = AdventureSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            queryset = Adventures.objects.all()
            serializer = AdventureSerializer(queryset, many=True)
            return Response(serializer.data)
        
class GetAdventureDetail(APIView):
    def get(self, request, act_id=None):
        if act_id is not None:
            queryset = Adventures.objects.get(id=act_id)
            serializer = AdventureSerializer(queryset)
            return Response(serializer.data)
        else:
            return Response({'msg':'get has nothing '})
        
class SearchAdventure(ListCreateAPIView):
    queryset = Adventures.objects.all()
    serializer_class = AdventureSerializer
    filter_backends = [SearchFilter]
    search_fields = ['activity_name', 'place']
# ****adventure view****


# *** destination views ***
class StaffDestinationList(APIView):
    def post(self, request):
        print(request.data)
        serializer = DestinationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'response': 'destination added successfully'})
        else:
            return Response({'response': 'destination didnt added'})
        
    def get(self, request, user_id=None):
        if user_id is not None:
            queryset = Destinations.objects.filter(owner=user_id)
            serializer = DestinationSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            queryset = Destinations.objects.all()
            serializer = DestinationSerializer(queryset, many=True)
            return Response(serializer.data)

class GetDestinationDeatail(APIView):
    def get(self, request, id=None):
        if id is not None:
            queryset = Destinations.objects.get(id=id)
            serializer = DestinationSerializer(queryset)
        else :
            queryset = Destinations.objects.all()
            serializer = DestinationSerializer(queryset, many=True)

        return Response(serializer.data)
    
class SearchDestinations(ListCreateAPIView):
    queryset = Destinations.objects.all()
    serializer_class = DestinationSerializer
    filter_backend = [SearchFilter]
    search_fields = ['spot_name']
# *** destination views ***

# ***views for staff admin***



# ***views for super admin***

class ListPendingResort(APIView):
    def get(self, request):
        queryset = Resorts.objects.filter(is_approved=False)
        serializer = ResortSerializer(queryset, many=True)
        return Response(serializer.data)

class SinglePendingResort(APIView):
    def get(self, request, pk):
        queryset = Resorts.objects.get(id=pk)
        serializer = ResortSerializer(queryset)
        return Response(serializer.data)
    
class ApproveResort(APIView):
    def get(self, request, user_id, pk):
        try:
            user = User.objects.get(id=user_id)
            resort = Resorts.objects.get(id=pk)
        except:
            raise NameError
        
        if (not user.is_staff):
            user.is_staff = True
            user.save()
            resort.is_approved = True
            resort.save()
            return Response({'msg': 'user and resort updated'})
        else:
            resort.is_approved = True
            resort.save()
            return Response({'msg': 'resort only updated'})
        
class BlockResort(APIView):
    def get(self, request, pk):
        resort = Resorts.objects.get(id=pk)
        resort.is_approved = not resort.is_approved
        resort.save()
        return Response({'msg': resort.is_approved})
    
class BlockAdventure(APIView):
    def get(self, request, pk):
        adventure = Adventures.objects.get(id=pk)
        adventure.is_approved = not adventure.is_approved
        adventure.save()
        return Response({'msg': adventure.is_approved})
    
class BlockDestination(APIView):
    def get(self, request, pk):
        destination = Destinations.objects.get(id=pk)
        destination.is_approved = not destination.is_approved
        destination.save()
        return Response({'msg': destination.is_approved})
