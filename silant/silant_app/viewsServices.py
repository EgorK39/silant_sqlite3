from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet
from .models import *
from .serializersServices import (
    ServiceCompanySerializer,
    ClientSerializer,
    TechnicSerializer,
    EngineSerializer,
    TransmissionSerializer,
    DrivingBridgeSerializer,
    ControlledBridgeSerializer,
    TypeOfToSerializer,
    RejectionSerializer,
    RecoveryMethodSerializer,
)
from .permissions import IsManagerOrNothing

""" settings """


class ServiceCompanyViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.ListModelMixin,
                            GenericViewSet):
    queryset = ModelOfServiceCompany.company.all()
    serializer_class = ServiceCompanySerializer
    permission_classes = [IsManagerOrNothing]


class ClientViewSet(mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.ListModelMixin,
                    GenericViewSet):
    queryset = ModelOfClients.client.all()
    serializer_class = ClientSerializer
    permission_classes = [IsManagerOrNothing]


class TechnicViewSet(mixins.CreateModelMixin,
                     mixins.RetrieveModelMixin,
                     mixins.UpdateModelMixin,
                     mixins.ListModelMixin,
                     GenericViewSet):
    queryset = ModelOfTechnic.objects.all()
    serializer_class = TechnicSerializer
    permission_classes = [IsManagerOrNothing]


class EngineViewSet(mixins.CreateModelMixin,
                    mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.ListModelMixin,
                    GenericViewSet):
    queryset = ModelOfEngine.objects.all()
    serializer_class = EngineSerializer
    permission_classes = [IsManagerOrNothing]


class TransmissionViewSet(mixins.CreateModelMixin,
                          mixins.RetrieveModelMixin,
                          mixins.UpdateModelMixin,
                          mixins.ListModelMixin,
                          GenericViewSet):
    queryset = ModelOfTransmission.objects.all()
    serializer_class = TransmissionSerializer
    permission_classes = [IsManagerOrNothing]


class DrivingBridgeViewSet(mixins.CreateModelMixin,
                           mixins.RetrieveModelMixin,
                           mixins.UpdateModelMixin,
                           mixins.ListModelMixin,
                           GenericViewSet):
    queryset = ModelOfDrivingBridge.objects.all()
    serializer_class = DrivingBridgeSerializer
    permission_classes = [IsManagerOrNothing]


class ControlledBridgeViewSet(mixins.CreateModelMixin,
                              mixins.RetrieveModelMixin,
                              mixins.UpdateModelMixin,
                              mixins.ListModelMixin,
                              GenericViewSet):
    queryset = ModelOfControlledBridge.objects.all()
    serializer_class = ControlledBridgeSerializer
    permission_classes = [IsManagerOrNothing]


class TypeOfToViewSet(mixins.CreateModelMixin,
                      mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin,
                      mixins.ListModelMixin,
                      GenericViewSet):
    queryset = TypeOfTo.objects.all()
    serializer_class = TypeOfToSerializer
    permission_classes = [IsManagerOrNothing]


class RejectionViewSet(mixins.CreateModelMixin,
                       mixins.RetrieveModelMixin,
                       mixins.UpdateModelMixin,
                       mixins.ListModelMixin,
                       GenericViewSet):
    queryset = Rejection.objects.all()
    serializer_class = RejectionSerializer
    permission_classes = [IsManagerOrNothing]


class RecoveryMethodViewSet(mixins.CreateModelMixin,
                            mixins.RetrieveModelMixin,
                            mixins.UpdateModelMixin,
                            mixins.ListModelMixin,
                            GenericViewSet):
    queryset = RecoveryMethod.objects.all()
    serializer_class = RecoveryMethodSerializer
    permission_classes = [IsManagerOrNothing]
