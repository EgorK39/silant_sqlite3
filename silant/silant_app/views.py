from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, mixins, status, generics

from .models import *
from .permissions import (
    IsClientOrNothing, IsCompanyOrNothing, IsManagerOrNothing
)
from .serializers import *
from .filters import (
    CarFilter, ToFilter, ReclamationFilter

)

""" CAR """

''' SimpleUser '''


class CarForSimpleUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarsForSimpleUsersSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend]
    filterset_class = CarFilter

    @action(methods=['get'], detail=False)
    def technic(self, request):
        technic = ModelOfTechnic.objects.all()
        return Response(
            {'technic': [{'id': t.id, 'name': t.name, 'description': t.description} for t in technic]})

    @action(methods=['get'], detail=True)
    def detailtechnic(self, request, pk=None):
        technic = ModelOfTechnic.objects.get(pk=pk)
        return Response({'technic': [technic.id, technic.name, technic.description]})

    @action(methods=['get'], detail=False)
    def engine(self, request):
        engine = ModelOfEngine.objects.all()
        return Response({'engine': [{'id': t.id, 'name': t.name, 'description': t.description} for t in engine]})

    @action(methods=['get'], detail=True)
    def detailengine(self, request, pk=None):
        engine = ModelOfEngine.objects.get(pk=pk)
        return Response({'engine': [engine.id, engine.name, engine.description]})

    @action(methods=['get'], detail=False)
    def transmission(self, request):
        transmission = ModelOfTransmission.objects.all()
        return Response(
            {'transmission': [{'id': t.id, 'name': t.name, 'description': t.description} for t in transmission]})

    @action(methods=['get'], detail=True)
    def detailtransmission(self, request, pk=None):
        transmission = ModelOfTransmission.objects.get(pk=pk)
        return Response({'transmission': [transmission.id, transmission.name, transmission.description]})

    @action(methods=['get'], detail=False)
    def drivingbridge(self, request):
        drivingbridge = ModelOfDrivingBridge.objects.all()
        return Response(
            {'drivingbridge': [{'id': t.id, 'name': t.name, 'description': t.description} for t in drivingbridge]})

    @action(methods=['get'], detail=True)
    def detaildrivingbridge(self, request, pk=None):
        drivingbridge = ModelOfDrivingBridge.objects.get(pk=pk)
        return Response({'drivingbridge': [drivingbridge.id, drivingbridge.name, drivingbridge.description]})

    @action(methods=['get'], detail=False)
    def controlledbridge(self, request):
        controlledbridge = ModelOfControlledBridge.objects.all()
        return Response({'controlledbridge': [{'id': t.id, 'name': t.name, 'description': t.description} for t in
                                              controlledbridge]})

    @action(methods=['get'], detail=True)
    def detailcontrolledbridge(self, request, pk=None):
        controlledbridge = ModelOfControlledBridge.objects.get(pk=pk)
        return Response(
            {'controlledbridge': [controlledbridge.id, controlledbridge.name, controlledbridge.description]})


# {    'transmission__name': ['icontains'],
#         'controlledBridge__name': ['icontains'],}

''' End SimpleUser '''

''' Client and Company'''


class CarsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CarSerializer
    permission_classes = [IsAuthenticated]

    filter_backends = [DjangoFilterBackend]
    filterset_class = CarFilter

    @action(methods=['get'], detail=False)
    def getname(self, request):
        user = request.user.pk
        print(user)
        if User.objects.get(pk=user).groups.filter(name='client').exists():
            name = ModelOfClients.client.get(namesOfUsers=User.objects.get(pk=user)).name
            return Response({'name': name, 'group': 'client'})
        elif User.objects.get(pk=user).groups.filter(name='organization').exists():
            name = ModelOfServiceCompany.company.get(namesOfUsers=User.objects.get(pk=user)).name
            return Response({'name': name, 'group': 'organization'})
        else:
            name = User.objects.get(pk=user).username
            return Response({'name': name, 'group': 'manager'})

    @action(methods=['get'], detail=False)
    def client(self, request):
        client = ModelOfClients.client.all()
        return Response(
            {'client': [{'id': t.id, 'name': t.name, 'description': t.description} for t
                        in client]})

    @action(methods=['get'], detail=True)
    def detailclient(self, request, pk=None):
        client = ModelOfClients.client.get(pk=pk)
        return Response({'client': [client.id, client.name, client.description]})

    @action(methods=['get'], detail=False)
    def company(self, request):
        company = ModelOfServiceCompany.company.all()
        return Response({'company': [
            {'id': t.id, 'name': t.name, 'description': t.description} for t in
            company]})

    @action(methods=['get'], detail=True)
    def detailcompany(self, request, pk=None):
        company = ModelOfServiceCompany.company.get(pk=pk)
        return Response({'company': [company.id, company.name, company.description]})

    @action(methods=['get'], detail=False)
    def rejection(self, request):
        rejection = Rejection.objects.all()
        return Response(
            {'rejection': [{'id': t.id, 'name': t.name, 'description': t.description} for t
                           in rejection]})

    @action(methods=['get'], detail=True)
    def detailrejection(self, request, pk=None):
        rejection = Rejection.objects.get(pk=pk)
        return Response({'rejection': [rejection.id, rejection.name, rejection.description]})

    @action(methods=['get'], detail=False)
    def recovery(self, request):
        recovery = RecoveryMethod.objects.all()
        return Response(
            {'recovery': [{'id': t.id, 'name': t.name, 'description': t.description} for t
                          in recovery]})

    @action(methods=['get'], detail=True)
    def detailrecovery(self, request, pk=None):
        recovery = RecoveryMethod.objects.get(pk=pk)
        return Response({'recovery': [recovery.id, recovery.name, recovery.description]})

    def get_queryset(self):  # TODO
        if self.request.user.pk and not self.request.user.is_superuser:
            pk = self.request.user.pk
            if IsClientOrNothing().has_permission(request=self.request, view=ToViewSet):
                return Car.objects.filter(client=ModelOfClients.client.get(namesOfUsers=User.objects.get(pk=pk)))
                # fixme Car.objects.filter(client=ModelOfClients.client.get(pk=pk))
                # fixme Car.objects.filter(client=ModelOfClients.objects.filter(namesOfUsers=User.objects.get(pk=pk))[0].id)
            elif IsCompanyOrNothing().has_permission(request=self.request, view=ToViewSet):
                return Car.objects.filter(
                    serviceCompany=ModelOfServiceCompany.company.get(namesOfUsers=User.objects.get(pk=pk)))
                # fixme Car.objects.filter(serviceCompany=ModelOfServiceCompany.company.get(pk=pk))
                # fixme Car.objects.filter(serviceCompany=ModelOfServiceCompany.objects.filter(namesOfUsers=User.objects.get(pk=pk))[0].id)
                # fixme Car.objects.filter(serviceCompany=ModelOfServiceCompany.objects.get(pk=User.objects.get(pk=5).id))
            else:
                return Exception('error')
        elif self.request.user.is_superuser:
            return Car.objects.all()
        else:
            return Exception('error')


''' Manager '''


class CarForManagerViewSet(mixins.CreateModelMixin,
                           mixins.RetrieveModelMixin,
                           mixins.UpdateModelMixin,
                           mixins.ListModelMixin,
                           GenericViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    permission_classes = [IsManagerOrNothing]

    filter_backends = [DjangoFilterBackend]
    filterset_class = CarFilter


""" TO """


class ToViewSet(mixins.CreateModelMixin,
                mixins.RetrieveModelMixin,
                mixins.UpdateModelMixin,
                mixins.ListModelMixin,
                GenericViewSet):
    # queryset = TO.objects.all()
    # serializer_class = TOSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ToFilter

    @action(methods=['get'], detail=False)
    def type(self, request):
        type = TypeOfTo.objects.all()
        return Response({'type': [
            {'id': t.id, 'name': t.name, 'description': t.description} for t in
            type]})

    @action(methods=['get'], detail=True)
    def detailtype(self, request, pk=None):
        type = TypeOfTo.objects.get(pk=pk)
        return Response({'type': [type.id, type.name, type.description]})

    def get_queryset(self):
        if self.request.user.pk and not self.request.user.is_superuser:
            pk = self.request.user.pk
            if IsClientOrNothing().has_permission(request=self.request, view=ToViewSet):
                print(f'IsClientOrNothing: {IsClientOrNothing().has_permission(request=self.request, view=ToViewSet)}')
                return TO.objects.filter(car__in=Car.objects.filter(client__namesOfUsers=User.objects.get(pk=pk)))
            # todo TO.objects.filter(car__in=Car.objects.filter(client__namesOfUsers=User.objects.get(pk=10)))
            elif IsCompanyOrNothing().has_permission(request=self.request, view=ToViewSet):
                print(
                    f'IsCompanyOrNothing: {IsCompanyOrNothing().has_permission(request=self.request, view=ToViewSet)}')
                return TO.objects.filter(serviceCompany__in=ModelOfServiceCompany.company.filter(namesOfUsers__pk=pk))

            elif IsManagerOrNothing().has_permission(request=self.request, view=ToViewSet):
                print(
                    f'IsManagerOrNothing: {IsManagerOrNothing().has_permission(request=self.request, view=ToViewSet)}')
                return TO.objects.all()
            else:
                return Exception('error')
        elif self.request.user.is_superuser:
            return TO.objects.all()
        else:
            return Exception('error')

    def get_serializer_class(self):
        if IsClientOrNothing().has_permission(request=self.request, view=ToViewSet):
            return TOSerializer
        elif IsCompanyOrNothing().has_permission(request=self.request, view=ToViewSet):
            return TOSerializer
        else:
            return TOManagerSerializer

    def create(self, request, *args, **kwargs):
        if IsCompanyOrNothing().has_permission(request=self.request, view=ToViewSet):
            if request.data:
                pk = request.user.pk
                print(f'METHOD: {self.allowed_methods}')

                print(f'data: {request.data}')
                print(f'PK: {request.user.pk}')
                print(f'csrfmiddlewaretoken: {request.data.get("csrfmiddlewaretoken")}')
                print(f'dateOfTo: {request.data.get("dateOfTo")}')
                print(f'work: {request.data.get("work")}')
                print(f'order: {request.data.get("order")}')
                print(f'data_dateOfOrder: {request.data.get("dateOfOrder")}')
                print(f'to: {request.data.get("to")}')
                print(f'whoMakeTo: {request.data.get("whoMakeTo")}')
                print(f'data_car: {request.data.get("car")}')
                print(f'data_com: {request.data.get("serviceCompany")}')

                csrfmiddlewaretoken = request.data.get("csrfmiddlewaretoken")
                dateOfTo = request.data.get("dateOfTo")
                work = request.data.get("work")
                order = request.data.get("order")
                dateOfOrder = request.data.get("dateOfOrder")
                to = request.data.get("to")
                whoMakeTo = request.data.get("whoMakeTo")
                car = request.data.get("car")
                serviceCompany = request.data.get("serviceCompany")
                print(f'None: {serviceCompany}')

                current_com_name = ModelOfServiceCompany.company.get(namesOfUsers__pk=pk)
                current_com_id = ModelOfServiceCompany.company.get(namesOfUsers__pk=pk).id
                print(f'current_com_name: {current_com_name}')
                print(f'current_com_id: {current_com_id}')
                if Car.objects.get(pk=car) in Car.objects.filter(serviceCompany__namesOfUsers=User.objects.get(pk=pk)):
                    print("TRUE")
                    serializer = self.get_serializer(data={
                        'csrfmiddlewaretoken': csrfmiddlewaretoken, 'dateOfTo': dateOfTo, 'work': work,
                        'order': order, 'dateOfOrder': dateOfOrder, 'to': to, 'whoMakeTo': whoMakeTo,
                        'car': car, 'serviceCompany': current_com_id
                    })
                    serializer.is_valid(raise_exception=True)
                    self.perform_create(serializer)
                    headers = self.get_success_headers(serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                else:
                    print('FALSE')
                    serializer = self.get_serializer(data={
                        'csrfmiddlewaretoken': csrfmiddlewaretoken, 'dateOfTo': dateOfTo, 'work': work,
                        'order': order, 'dateOfOrder': dateOfOrder, 'to': to, 'whoMakeTo': whoMakeTo,
                        'car': car, 'serviceCompany': current_com_id
                    })
                    serializer.is_valid(raise_exception=True)
                    return Response(serializer.data, status=status.HTTP_303_SEE_OTHER,
                                    headers={'error': "You need to choose one of your company's machines"})

        elif IsClientOrNothing().has_permission(request=self.request, view=ToViewSet):
            if request.data:
                PK = request.user.pk
                csrfmiddlewaretoken = request.data.get("csrfmiddlewaretoken")
                dateOfTo = request.data.get("dateOfTo")
                work = request.data.get("work")
                order = request.data.get("order")
                dateOfOrder = request.data.get("dateOfOrder")
                to = request.data.get("to")
                whoMakeTo = request.data.get("whoMakeTo")
                car = request.data.get("car")
                serviceCompany = request.data.get("serviceCompany")
                # current_com_name = ModelOfServiceCompany.company.get(namesOfUsers__pk=pk)
                # current_com_id = ModelOfServiceCompany.company.get(namesOfUsers__pk=pk).id

                # TODO current_com_name = ModelOfServiceCompany.company.get(namesOfUsers__pk=pk)
                # TODO current_com_id = ModelOfServiceCompany.company.get(namesOfUsers__pk=pk).id
                if Car.objects.get(pk=car) in Car.objects.filter(client__namesOfUsers=User.objects.get(pk=PK)):
                    current_com_id = Car.objects.get(pk=car).serviceCompany.pk
                    print("TRUE")
                    serializer = self.get_serializer(data={
                        'csrfmiddlewaretoken': csrfmiddlewaretoken, 'dateOfTo': dateOfTo, 'work': work,
                        'order': order, 'dateOfOrder': dateOfOrder, 'to': to, 'whoMakeTo': whoMakeTo,
                        'car': car, 'serviceCompany': current_com_id
                    })
                    serializer.is_valid(raise_exception=True)
                    self.perform_create(serializer)
                    headers = self.get_success_headers(serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                else:
                    print('FALSE')
                    current_com_id = Car.objects.get(pk=car).serviceCompany.pk
                    serializer = self.get_serializer(data={
                        'csrfmiddlewaretoken': csrfmiddlewaretoken, 'dateOfTo': dateOfTo, 'work': work,
                        'order': order, 'dateOfOrder': dateOfOrder, 'to': to, 'whoMakeTo': whoMakeTo,
                        'car': car, 'serviceCompany': current_com_id
                    })
                    serializer.is_valid(raise_exception=True)
                    return Response(serializer.data, status=status.HTTP_303_SEE_OTHER,
                                    headers={'error': 'You need to choose one of your machines'})
        else:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class RecClientViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Reclamation.objects.all()
    serializer_class = RecSerializer
    permission_classes = [IsClientOrNothing]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ReclamationFilter

    def get_queryset(self):
        if self.request.user.pk and not self.request.user.is_superuser:
            pk = self.request.user.pk
            return Reclamation.objects.filter(car__in=Car.objects.filter(client__namesOfUsers=User.objects.get(pk=pk)))
            # fixme Car.objects.filter(serviceCompany=ModelOfServiceCompany.company.get(pk=pk))
            # fixme Car.objects.filter(serviceCompany=ModelOfServiceCompany.objects.filter(namesOfUsers=User.objects.get(pk=pk))[0].id)
            # fixme Car.objects.filter(serviceCompany=ModelOfServiceCompany.objects.get(pk=User.objects.get(pk=5).id))
        elif self.request.user.is_superuser:
            return Reclamation.objects.all()
        else:
            return Exception('error')


class ReclamationViewSet(mixins.CreateModelMixin,
                         mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.ListModelMixin,
                         GenericViewSet):
    serializer_class = RecSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ReclamationFilter

    def get_queryset(self):
        if self.request.user.pk and not self.request.user.is_superuser:
            pk = self.request.user.pk
            if IsCompanyOrNothing().has_permission(request=self.request, view=ToViewSet):
                print(
                    f'IsCompanyOrNothing: {IsCompanyOrNothing().has_permission(request=self.request, view=ToViewSet)}')
                return Reclamation.objects.filter(
                    car__in=Car.objects.filter(serviceCompany__namesOfUsers=User.objects.get(pk=pk)))

            elif IsManagerOrNothing().has_permission(request=self.request, view=ToViewSet):
                print(
                    f'IsManagerOrNothing: {IsManagerOrNothing().has_permission(request=self.request, view=ToViewSet)}')
                return Reclamation.objects.all()
            else:
                return Exception('error')
        elif self.request.user.is_superuser:
            return Reclamation.objects.all()
        else:
            return Exception('error')

    def create(self, request, *args, **kwargs):
        if IsCompanyOrNothing().has_permission(request=self.request, view=ToViewSet):
            if request.data:
                pk = request.user.pk
                print(f'METHOD: {self.allowed_methods}')

                print(f'data: {request.data}')
                print(f'PK: {request.user.pk}')
                print(f'csrfmiddlewaretoken: {request.data.get("csrfmiddlewaretoken")}')
                print(f'dateOfTo: {request.data.get("dateOfTo")}')
                print(f'work: {request.data.get("work")}')
                print(f'order: {request.data.get("order")}')
                print(f'data_dateOfOrder: {request.data.get("dateOfOrder")}')
                print(f'to: {request.data.get("to")}')
                print(f'whoMakeTo: {request.data.get("whoMakeTo")}')
                print(f'data_car: {request.data.get("car")}')
                print(f'data_com: {request.data.get("serviceCompany")}')

                csrfmiddlewaretoken = request.data.get("csrfmiddlewaretoken")
                dateOfRejection = request.data.get("dateOfRejection")
                work = request.data.get("work")
                description = request.data.get("description")
                spareParts = request.data.get("spareParts")
                DateOfRestoration = request.data.get("DateOfRestoration")
                downtime = request.data.get("downtime")
                car = request.data.get("car")
                serviceCompany = request.data.get("serviceCompany")
                nodeOfRejection = request.data.get("nodeOfRejection")
                recovery = request.data.get("recovery")

                print(f'nodeOfRejection: {nodeOfRejection}')

                current_com_name = ModelOfServiceCompany.company.get(namesOfUsers__pk=pk)
                current_com_id = ModelOfServiceCompany.company.get(namesOfUsers__pk=pk).id
                print(f'current_com_name: {current_com_name}')
                print(f'current_com_id: {current_com_id}')
                currenServiceCompany = Car.objects.get(pk=car).serviceCompany.id
                if Car.objects.get(pk=car) in Car.objects.filter(serviceCompany__namesOfUsers=User.objects.get(pk=pk)):
                    print("TRUE")
                    serializer = self.get_serializer(data={
                        'csrfmiddlewaretoken': csrfmiddlewaretoken, 'dateOfRejection': dateOfRejection, 'work': work,
                        'description': description, 'spareParts': spareParts, 'DateOfRestoration': DateOfRestoration,
                        'downtime': downtime,
                        'car': car, 'serviceCompany': currenServiceCompany, 'nodeOfRejection': nodeOfRejection,
                        'recovery': recovery
                    })
                    serializer.is_valid(raise_exception=True)
                    self.perform_create(serializer)
                    headers = self.get_success_headers(serializer.data)
                    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
                else:
                    print('FALSE')
                    serializer = self.get_serializer(data={
                        'csrfmiddlewaretoken': csrfmiddlewaretoken, 'dateOfRejection': dateOfRejection, 'work': work,
                        'description': description, 'spareParts': spareParts, 'DateOfRestoration': DateOfRestoration,
                        'downtime': downtime,
                        'car': car, 'serviceCompany': currenServiceCompany, 'nodeOfRejection': nodeOfRejection,
                        'recovery': recovery
                    })
                    serializer.is_valid(raise_exception=True)
                    return Response(serializer.data, status=status.HTTP_303_SEE_OTHER,
                                    headers={'error': "You need to choose one of your company's machines"})

        elif IsManagerOrNothing().has_permission(request=self.request, view=ToViewSet):
            if request.data:
                PK = request.user.pk
                csrfmiddlewaretoken = request.data.get("csrfmiddlewaretoken")
                dateOfRejection = request.data.get("dateOfRejection")
                work = request.data.get("work")
                description = request.data.get("description")
                spareParts = request.data.get("spareParts")
                DateOfRestoration = request.data.get("DateOfRestoration")
                downtime = request.data.get("downtime")
                car = request.data.get("car")
                serviceCompany = request.data.get("serviceCompany")
                nodeOfRejection = request.data.get("nodeOfRejection")
                recovery = request.data.get("recovery")

                # TODO current_com_name = ModelOfServiceCompany.company.get(namesOfUsers__pk=pk)
                # TODO current_com_id = ModelOfServiceCompany.company.get(namesOfUsers__pk=pk).id
                current_com_id = Car.objects.get(pk=car).serviceCompany.pk

                print("TRUE")
                serializer = self.get_serializer(data={
                    'csrfmiddlewaretoken': csrfmiddlewaretoken, 'dateOfRejection': dateOfRejection, 'work': work,
                    'description': description, 'spareParts': spareParts, 'DateOfRestoration': DateOfRestoration,
                    'downtime': downtime,
                    'car': car, 'serviceCompany': current_com_id, 'nodeOfRejection': nodeOfRejection,
                    'recovery': recovery
                })
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                headers = self.get_success_headers(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        # else:
        #     serializer = self.get_serializer(data=request.data)
        #     serializer.is_valid(raise_exception=True)
        #     self.perform_create(serializer)
        #     headers = self.get_success_headers(serializer.data)
        #
        #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
