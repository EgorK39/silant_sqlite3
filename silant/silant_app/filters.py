from django_filters import rest_framework as filters
from .models import *


class CarFilter(filters.FilterSet):
    class Meta:
        model = Car
        fields = {
            'technic': ['in'],
            'engine': ['in'],
            'transmission': ['in'],
            'controlledBridge': ['in'],
            'drivingBridge': ['in'],
            'vin': ['iendswith']
        }


class ToFilter(filters.FilterSet):
    class Meta:
        model = TO
        fields = {
            'to': ['in'],
            'car__vin': ['iendswith'],
            'whoMakeTo': ['in'],
            'whoMakeTo__name': ['icontains'],

            'serviceCompany': ['in'],
            'serviceCompany__name': ['icontains'],

        }


class ReclamationFilter(filters.FilterSet):
    class Meta:
        model = Reclamation
        fields = {
            # 'nodeOfRejection__name': ['icontains', 'in'],
            # 'recovery__name': ['icontains', 'in'],
            'nodeOfRejection': ['exact'],
            'recovery': ['exact'],
            'serviceCompany': ['in'],
            'serviceCompany__name': ['icontains'],

        }
