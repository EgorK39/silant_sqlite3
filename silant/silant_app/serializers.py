from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from .models import *


class CarsForSimpleUsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = [
            'id',
            'vin',
            'technic',
            'engine',
            'engineNo',
            'transmission',
            'transmissionNo',
            'drivingBridge',
            'drivingBridgeNo',
            'controlledBridge',
            'controlledBridgeNo'
        ]


class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'


class TOSerializer(serializers.ModelSerializer):
    # serviceCompany = serializers.HiddenField(default=0)

    class Meta:
        model = TO
        fields = '__all__'


class TOManagerSerializer(serializers.ModelSerializer):
    # user = serializers.HiddenField(
    #     default=serializers.CurrentUserDefault()
    # )

    class Meta:
        model = TO
        fields = '__all__'


class RecSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reclamation
        fields = '__all__'
