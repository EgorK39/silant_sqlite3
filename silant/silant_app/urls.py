from django.urls import path, include
from rest_framework import routers

from .views import (
    CarForSimpleUserViewSet,
    CarsViewSet,
    ToViewSet,
    RecClientViewSet,
    ReclamationViewSet,
    CarForManagerViewSet,
)

from .viewsServices import (
    ServiceCompanyViewSet,
    ClientViewSet,
    TechnicViewSet,
    EngineViewSet,
    TransmissionViewSet,
    DrivingBridgeViewSet,
    ControlledBridgeViewSet,
    TypeOfToViewSet,
    RejectionViewSet,
    RecoveryMethodViewSet,
)

router = routers.SimpleRouter()
router.register(r'car/user', CarForSimpleUserViewSet)
router.register(r'car', CarsViewSet, basename='car')
router.register(r'to', ToViewSet, basename='to')
router.register(r'rec/client', RecClientViewSet)
router.register(r'rec', ReclamationViewSet, basename='reclamation')

""" services """
router.register(r'services/company', ServiceCompanyViewSet)
router.register(r'services/client', ClientViewSet)
router.register(r'services/technic', TechnicViewSet)
router.register(r'services/engine', EngineViewSet)
router.register(r'services/transmission', TransmissionViewSet)
router.register(r'services/drbridge', DrivingBridgeViewSet)
router.register(r'services/cobridge', ControlledBridgeViewSet)
router.register(r'services/type', TypeOfToViewSet)
router.register(r'services/rejection', RejectionViewSet)
router.register(r'services/recovery', RecoveryMethodViewSet)

urlpatterns = [
    path('api/v1/', include(router.urls)),
    # path('api/v1/auth/', include('rest_framework.urls')),  # FIXME
    path('api/v1/cars/', CarForManagerViewSet.as_view(
        {'get': 'list', 'post': 'create'}
    )),
    path('api/v1/cars/<int:pk>/', CarForManagerViewSet.as_view(
        {'get': 'retrieve', 'put': 'update'}
    )),

    # path('api/v1/cars/', CarForSimpleUserAPIViewSet.as_view(
    #     {'get': 'list'}
    # )),
    # path('api/v1/cars/<int:pk>/', CarForSimpleUserAPIViewSet.as_view(
    #     {'get': 'retrieve'}
    # )),

]
