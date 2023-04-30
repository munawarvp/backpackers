from django.urls import path
from .views import (CreateResortBooking, AdminListBookings, GetBookingSummary, CreateAdventureBooking, GetAdventureBooking,
                    ListAdventureBookings, StaffListBookings, StaffAdventureBookings, ChangeResortBookingStatus,
                    StaffResortBookingFilter, StaffSearchResortBooking)


urlpatterns = [
    path('createbookingresort/', CreateResortBooking.as_view()),
    path('admingetallbookings/', AdminListBookings.as_view()),
    path('getbookingsummary/<int:booking_id>', GetBookingSummary.as_view()),

    path('createbookingadventure/', CreateAdventureBooking.as_view()),
    path('adventurebookingsummary/<int:booking_id>', GetAdventureBooking.as_view()),
    path('admingetadventurebookings/', ListAdventureBookings.as_view()),

    path('stafflistresortbookings/<int:user_id>', StaffListBookings.as_view()),
    path('stafflistadventurebookings/<int:user_id>', StaffAdventureBookings.as_view()),
    path('changebookingstatus/<int:value>/<int:booking_id>', ChangeResortBookingStatus.as_view()),

    path('filterresortbooking/<int:user_id>/<int:value>', StaffResortBookingFilter.as_view()),
    path('searchresortbooking/<int:user_id>', StaffSearchResortBooking.as_view()),
]
