from django.conf.urls import url, include
from rest_framework.routers import DefaultRouter
from rest_framework.schemas import get_schema_view

from ai4all_api import views

schema_view = get_schema_view(title='AI4All backend API')

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'submit-camera-items', views.SubmitCameraItemViewSet)

# The API URLs are now determined automatically by the router.
# Additionally, we include the login URLs for the browsable API.
urlpatterns = [
    url(r'^schema/$', schema_view),
    url(r'^api/', include(router.urls)),
]
