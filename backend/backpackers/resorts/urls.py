from django.urls import path
from . import views
from .views import LocationList, ResortList, CreateResort, ListResorts


urlpatterns = [
    path('locations/', LocationList.as_view()),
    path('resortslist/', ResortList.as_view()),
    path('createresorts/', CreateResort.as_view()),
    path('listresorts/', ListResorts.as_view({'get': 'list','post': 'create'})),
]
