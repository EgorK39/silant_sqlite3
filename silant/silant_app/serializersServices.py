from rest_framework import serializers
from rest_framework.fields import CurrentUserDefault

from .models import (
    ModelOfServiceCompany,
    ModelOfClients,
    ModelOfTechnic,
    ModelOfEngine,
    ModelOfTransmission,
    ModelOfDrivingBridge,
    ModelOfControlledBridge,
    TypeOfTo,
    Rejection,
    RecoveryMethod,
)


class ServiceCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfServiceCompany
        fields = '__all__'


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfClients
        fields = '__all__'


class TechnicSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfTechnic
        fields = '__all__'


class EngineSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfEngine
        fields = '__all__'


class TransmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfTransmission
        fields = '__all__'


class DrivingBridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfDrivingBridge
        fields = '__all__'


class ControlledBridgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ModelOfControlledBridge
        fields = '__all__'


class TypeOfToSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfTo
        fields = '__all__'


class RejectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rejection
        fields = '__all__'


class RecoveryMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecoveryMethod
        fields = '__all__'
