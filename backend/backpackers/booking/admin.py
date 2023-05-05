from django.contrib import admin
from .models import ResortBooking, AdventureBooking, ResortReviews, AdventureReviews, DestinationReviews, Coupon, CouponAssign

# Register your models here.
admin.site.register(ResortBooking)
admin.site.register(AdventureBooking)
admin.site.register(ResortReviews)
admin.site.register(AdventureReviews)
admin.site.register(DestinationReviews)

admin.site.register(Coupon)
admin.site.register(CouponAssign)



