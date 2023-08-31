import datetime

from django.contrib.auth.models import User, Group
from django.db import models


class Car(models.Model):
    vin = models.CharField(unique=True, max_length=220,
                           db_column='Зав. № машины')
    technic = models.ForeignKey("ModelOfTechnic",
                                on_delete=models.CASCADE,
                                db_column='Модель техники')
    engine = models.ForeignKey("ModelOfEngine",
                               on_delete=models.CASCADE,
                               db_column='Модель двигателя')
    engineNo = models.CharField(unique=True,
                                max_length=220,
                                db_column='Зав. № двигателя')
    transmission = models.ForeignKey("ModelOfTransmission",
                                     on_delete=models.CASCADE,
                                     db_column='Модель трансмиссии')
    transmissionNo = models.CharField(unique=True,
                                      max_length=220,
                                      db_column='Зав. № трансмиссии')
    drivingBridge = models.ForeignKey("ModelOfDrivingBridge",
                                      on_delete=models.CASCADE,
                                      db_column='Модель ведущего моста')
    drivingBridgeNo = models.CharField(unique=True,
                                       max_length=220,
                                       db_column='Зав. № ведущего моста')
    controlledBridge = models.ForeignKey("ModelOfControlledBridge",
                                         on_delete=models.CASCADE,
                                         db_column='Модель управляемого моста')
    controlledBridgeNo = models.CharField(unique=True,
                                          max_length=220,
                                          db_column='Зав. № управляемого моста')
    contract = models.CharField(max_length=255, null=True, blank=True,
                                db_column='Договор поставки №, дата')
    dateOfShipment = models.DateField(db_column='Дата отгрузки с завода')
    consignee = models.CharField(max_length=188,
                                 db_column='Грузополучатель')
    deliveryAddress = models.CharField(max_length=255,
                                       db_column='Адрес поставки')
    equipment = models.CharField(max_length=180,
                                 db_column='Комплектация')
    client = models.ForeignKey("ModelOfClients",
                               on_delete=models.CASCADE, db_column='Клиент')  # todo
    serviceCompany = models.ForeignKey("ModelOfServiceCompany",
                                       on_delete=models.CASCADE,
                                       db_column='Сервисная компания')  # todo

    class Meta:
        ordering = ['-dateOfShipment']
        db_table = 'Car'

    def save(self, *args, **kwargs):
        super().save()
        if self.dateOfShipment > datetime.date.today():
            self.dateOfShipment = datetime.date.today()
            self.save()

    def __str__(self):
        return "Зав. № машины: %s" % self.vin


''' models to Car TABLE
User.objects.filter(groups__name='client')
User.objects.get(pk=2).groups.all().values('name')[0].get('name')
User.objects.get(pk=2).groups.all().get().name

'''

''' COMPANY '''


class CompanyManager(models.Manager):
    def get_queryset(self):
        # return super().get_queryset().filter(namesOfUsers='')
        return super().get_queryset().filter(namesOfUsers__in=User.objects.filter(groups__name='organization'))


class ModelOfServiceCompany(models.Model):
    namesOfUsers = models.OneToOneField(User, help_text="Можно добавить только организацию",
                                        on_delete=models.CASCADE)
    name = models.CharField(max_length=124, unique=True)
    description = models.TextField()

    company = CompanyManager()

    def save(self, *args, **kwargs):

        if not self.namesOfUsers.groups.filter(name='organization').exists():
            print(f'WORK: {self.namesOfUsers.groups.all()}')
            # raise Exception('Слишком большой размер изображения') FIXME
        else:
            print(f"Group: {self.namesOfUsers.groups.filter(name='organization').exists()}")
            print(f"GroupV: {self.namesOfUsers.groups.filter(name='organization')}")
            super(ModelOfServiceCompany, self).save(*args, **kwargs)

    def __str__(self):
        return "User: %s, name: %s" % (self.namesOfUsers.username, self.name)


''' End COMPANY '''

'''client'''


class ClientManager(models.Manager):
    def get_queryset(self):
        # return super().get_queryset().filter(namesOfUsers='')
        return super().get_queryset().filter(namesOfUsers__in=User.objects.filter(groups__name='client'))

    # Group.objects.get(name='organization').user_set.all()
    # TODO ModelOfClients.objects.filter(namesOfUsers__in=User.objects.filter(groups__name='client'))
    # TODO MyModelForClient.client.get(pk=2).namesOfUsers.groups.filter(name='client').exists()


class ModelOfClients(models.Model):
    namesOfUsers = models.OneToOneField(User, help_text="Можно добавить только клиентов",
                                        on_delete=models.CASCADE)
    name = models.CharField(max_length=124, unique=True)
    description = models.TextField()

    # objects = models.Manager()
    client = ClientManager()

    def save(self, *args, **kwargs):

        if not self.namesOfUsers.groups.filter(name='client').exists():
            print(f'WORK: {self.namesOfUsers.groups.all()}')
            # raise Exception('Слишком большой размер изображения') FIXME
        else:
            print(f"Group: {self.namesOfUsers.groups.filter(name='client').exists()}")
            super().save(*args, **kwargs)

    def __str__(self):
        return "User: %s, name: %s" % (self.namesOfUsers.username, self.name)
        # return self.namesOfUsers.first_name
    # first_name or username


'''end client'''


class ModelOfTechnic(models.Model):
    name = models.CharField(max_length=124, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class ModelOfEngine(models.Model):
    name = models.CharField(max_length=124, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class ModelOfTransmission(models.Model):
    name = models.CharField(max_length=124, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class ModelOfDrivingBridge(models.Model):
    name = models.CharField(max_length=124, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class ModelOfControlledBridge(models.Model):
    name = models.CharField(max_length=124, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name


''' ------ end block -------- '''


class TO(models.Model):
    to = models.ForeignKey("TypeOfTo",
                           on_delete=models.CASCADE,
                           db_column='Вид ТО'
                           )
    dateOfTo = models.DateField(db_column='Дата проведения ТО')
    work = models.IntegerField(default=0,
                               db_column='Наработка, м/час')
    order = models.CharField(max_length=124,
                             db_column='№ заказ-наряда')
    dateOfOrder = models.DateField(db_column='Дата заказ-наряда')
    whoMakeTo = models.ForeignKey(ModelOfServiceCompany,
                                  on_delete=models.CASCADE,
                                  db_column='Организация, проводившая ТО',
                                  related_name='org'
                                  )

    car = models.ForeignKey(Car, on_delete=models.CASCADE,
                            db_column='Машина'
                            )
    serviceCompany = models.ForeignKey(ModelOfServiceCompany,
                                       on_delete=models.CASCADE,
                                       db_column='Сервисная компания')  # todo

    class Meta:
        ordering = ['-dateOfTo']
        # db_table = 'TO'

    def save(self, *args, **kwargs):
        super().save()
        print(f'self.car: {self.car}')
        print(f'self.car.pk: {self.car.pk}')
        t = Car.objects.get(pk=self.car.pk).serviceCompany
        print(f'!!!serviceCompany!!: {t}')
        if self.serviceCompany != Car.objects.get(pk=self.car.pk).serviceCompany:
            self.serviceCompany = Car.objects.get(pk=self.car.pk).serviceCompany
            self.save()
        else:
            if self.work < 0:
                self.work = 0
                self.save()
            else:
                print(f'WORK: {self.work}')
                if self.dateOfTo > datetime.date.today():
                    self.dateOfTo = datetime.date.today()
                    self.save()
                else:
                    if self.dateOfOrder > datetime.date.today():
                        self.dateOfOrder = datetime.date.today()
                        self.save()
                    else:
                        print("ok")
                        return

    def __str__(self):
        return "Вид ТО: %s; " \
               "Машина: %s" % (self.to.name, self.car.vin)


''' models to TO TABLE'''


class TypeOfTo(models.Model):
    name = models.CharField(max_length=124, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name


# class ListOfOrg(models.Model):
#     name = models.CharField(max_length=124, unique=True)
#     description = models.TextField()
#
#     def __str__(self):
#         return self.name


''' ------- end block ------- '''


class Reclamation(models.Model):
    dateOfRejection = models.DateField(db_column='Дата отказа')
    work = models.IntegerField(default=0,
                               db_column='Наработка, м/час')
    nodeOfRejection = models.ManyToManyField("Rejection",
                                             db_column='Узел отказа'
                                             )

    description = models.TextField(db_column='Описание отказа')
    recovery = models.ManyToManyField("RecoveryMethod",
                                      db_column='Способ восстановления'
                                      )
    spareParts = models.TextField(db_column='Используемые запасные части',
                                  blank=True, null=True
                                  )
    DateOfRestoration = models.DateField(db_column='Дата восстановления')
    downtime = models.IntegerField(db_column='Время простоя техники',
                                   blank=True, null=True)
    car = models.ForeignKey(Car,
                            on_delete=models.CASCADE,
                            db_column='Mашина'
                            )
    serviceCompany = models.ForeignKey(ModelOfServiceCompany,
                                       on_delete=models.CASCADE,
                                       db_column='Сервисная компания')  # todo

    class Meta:
        ordering = ['-dateOfRejection']
        db_table = 'Reclamation'

    def save(self, *args, **kwargs):
        super().save()

        print(f'self.car: {self.car}')
        print(f'self.car.pk: {self.car.pk}')
        t = Car.objects.get(pk=self.car.pk).serviceCompany
        print(f'!!!serviceCompany!!: {t}')
        if self.serviceCompany != Car.objects.get(pk=self.car.pk).serviceCompany:
            self.serviceCompany = Car.objects.get(pk=self.car.pk).serviceCompany
            self.save()
        else:
            if self.work < 0:
                self.work = 0
                self.save()
            else:
                print(f'WORK: {self.work}')
                if self.dateOfRejection > datetime.date.today():
                    self.dateOfRejection = datetime.date.today()
                    self.save()
                else:
                    if self.DateOfRestoration > datetime.date.today():
                        self.DateOfRestoration = datetime.date.today()
                        self.save()
                    else:
                        if self.dateOfRejection > self.DateOfRestoration:
                            self.DateOfRestoration = datetime.date.today()
                            self.save()

                        else:
                            if self.DateOfRestoration < self.dateOfRejection:
                                self.DateOfRestoration = datetime.date.today()
                                self.save()
                            else:
                                if self.downtime == int(
                                        (self.DateOfRestoration - self.dateOfRejection).total_seconds() / 60 / 60 / 24):
                                    return
                                else:
                                    self.downtime = int(
                                        (self.DateOfRestoration - self.dateOfRejection).total_seconds() / 60 / 60 / 24)
                                    print(f'1: {self.DateOfRestoration}')
                                    print(f'2: {self.dateOfRejection}')
                                    print(f'3: {self.downtime}')
                                    # print(f'3: {self.downtime.days}')
                                    # print(f'4: {self.downtime.total_seconds()}')
                                    # print(f'5: {int(self.downtime.total_seconds() / 60 / 60 / 24)}')
                                    self.save()

    def __str__(self):
        return "Машина: %s" % self.car


''' models to Reclamation TABLE'''


class Rejection(models.Model):
    name = models.CharField(max_length=124, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name


class RecoveryMethod(models.Model):
    name = models.CharField(max_length=124, unique=True)
    description = models.TextField()

    def __str__(self):
        return self.name


''' ------- end block ------- '''
