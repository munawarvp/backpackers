from django.shortcuts import render
import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import ResortBooking, AdventureBooking
from resorts.models import Resorts
from .serializers import PostResortBookingSerializer, ResortBookingSerializer, AdventureBookingSerializer, PostAdventureBookingSerializer

# Create your views here.

class CreateResortBooking(APIView):
    def post(self, request):

        ch_in = request.data['check_in']
        ch_out = request.data['check_out']
        resort_id = request.data['booked_resort']
        availability_case1 = ResortBooking.objects.filter(booked_resort=resort_id, check_in__lte=ch_in, check_out__gte=ch_in).exists()
        availability_case2 = ResortBooking.objects.filter(booked_resort=resort_id, check_in__lte=ch_out, check_out__gte=ch_out).exists()
        availability_case3 = ResortBooking.objects.filter(booked_resort=resort_id, check_in__gte=ch_in, check_out__lte=ch_out).exists()
        print(availability_case1, 'case one')
        
        if availability_case2 or availability_case1 or availability_case3:
            return Response({'msg': 504})
        else:
            count = ResortBooking.objects.last()
            id = request.data['user']
            yr = int(datetime.date.today().strftime('%Y'))
            dt = int(datetime.date.today().strftime('%d'))
            mt = int(datetime.date.today().strftime('%m'))
            d = datetime.date(yr,mt,dt)
            current_date = d.strftime("%Y%m%d")
            booking_id = current_date + str(id) + str(count.id+1)
            print(booking_id)
            data = request.data.copy()
            data['booking_id'] = booking_id
            print(data)
            
            serializer = PostResortBookingSerializer(data=data)
            serializer.is_valid()
            print(serializer.errors)
            if(serializer.is_valid()):
                serializer.save()
                return Response({'msg': 200, 'booking_id': booking_id})
            return Response({'msg': 404})


class AdminListBookings(APIView):
    def get(self, request):
        queryset = ResortBooking.objects.all()
        serializer = ResortBookingSerializer(queryset, many=True)
        return Response(serializer.data)
    
class GetBookingSummary(APIView):
    def get(self, request, booking_id):
        queryset = ResortBooking.objects.get(booking_id=booking_id)
        serializer = ResortBookingSerializer(queryset)
        return Response(serializer.data)
    

class StaffListBookings(APIView):
    def get(self, request, user_id):
        queryset = ResortBooking.objects.filter(booked_resort__owner = user_id)
        print(queryset)
        serializer = ResortBookingSerializer(queryset, many=True)
        return Response(serializer.data)
    

# adventure bookings


class CreateAdventureBooking(APIView):
    def post(self, request):
        count = AdventureBooking.objects.last()
        if count:
            count = count.id
        else:
            count = 1
        id = request.data['user']
        yr = int(datetime.date.today().strftime('%Y'))
        dt = int(datetime.date.today().strftime('%d'))
        mt = int(datetime.date.today().strftime('%m'))
        d = datetime.date(yr,mt,dt)
        current_date = d.strftime("%Y%m%d")
        booking_id = current_date + str(id) + str(count+1)
        print(booking_id)
        data = request.data.copy()
        data['booking_id'] = booking_id
        print(data)

        serializer = PostAdventureBookingSerializer(data=data)
        print(serializer.is_valid())
        print(serializer.errors)
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 200, 'booking_id': booking_id})
        return Response({'msg': 504})
   
    
class ListAdventureBookings(APIView):
    def get(self, request):
        queryset = AdventureBooking.objects.all()
        serializer = AdventureBookingSerializer(queryset, many=True)
        return Response(serializer.data)


class GetAdventureBooking(APIView):
    def get(self, request, booking_id):
        queryset = AdventureBooking.objects.get(booking_id=booking_id)
        serializer = AdventureBookingSerializer(queryset)
        return Response(serializer.data)
    

class StaffAdventureBookings(APIView):
    def get(self, request, user_id):
        queryset = AdventureBooking.objects.filter(booked_activity__owner=user_id)
        serializer = AdventureBookingSerializer(queryset, many=True)
        return Response(serializer.data)