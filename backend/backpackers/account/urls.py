from django.urls import path
from account.views import UserRegistration, ForgotPassword, ResetPassword
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (TokenObtainPairView,TokenRefreshView)


urlpatterns = [
    path('', views.getRoutes),
    path('register/', UserRegistration.as_view()),
    path('activate/<uidb64>/<token> ', views.activate, name='activate'),

    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('forgotpassword/', ForgotPassword.as_view()),
    path('reset_validate/<uidb64>/<token> ', views.reset_validate, name='reset_validate'),
    path('resetpassword/', ResetPassword.as_view()),
]
