from django.urls import path
from . import views
from .views import (LocationList, ResortList, CreateResort,
                    ListResorts, ListPendingResort, BlockResort,
                    SinglePendingResort, ApproveResort, StaffPendingResort,
                    StaffAdventureList, GetAdventureDetail, SearchAdventure,
                    StaffDestinationList,GetDestinationDeatail,SearchDestinations,
                    SearchResorts, BlockAdventure, BlockDestination)


urlpatterns = [
    path('locations/', LocationList.as_view()),

    path('resortslist/', ResortList.as_view()),
    path('createresorts/', CreateResort.as_view()),
    path('searchresorts/', SearchResorts.as_view()),

    path('listresorts/', ListResorts.as_view({'get': 'list','post': 'create'})),
    path('listpending/', ListPendingResort.as_view()),
    path('singleresort/<int:pk>', SinglePendingResort.as_view()),
    path('blockresort/<int:pk>', BlockResort.as_view()),

    path('approveresort/<int:user_id>/<int:pk>', ApproveResort.as_view()),

    path('staffpendingresort/<int:id>', StaffPendingResort.as_view()),

    path('stafflistadventure/', StaffAdventureList.as_view(), name='adventure-create'),
    path('stafflistadventure/<int:user_id>', StaffAdventureList.as_view(), name='adventure-list'),
    path('getadventuredetail/<int:act_id>', GetAdventureDetail.as_view()),
    path('searchadventure/', SearchAdventure.as_view()),
    path('blockadventure/<int:pk>', BlockAdventure.as_view()),

    path('stafflistdestination/', StaffDestinationList.as_view(), name='destination-create'),
    path('stafflistdestination/<int:user_id>', StaffDestinationList.as_view(), name='destination-create'),
    path('getdestinationdetail/', GetDestinationDeatail.as_view()),
    path('getdestinationdetail/<int:id>', GetDestinationDeatail.as_view()),
    path('searchdestination/', SearchDestinations.as_view()),
    path('blockdestination/<int:pk>', BlockDestination.as_view()),

]
