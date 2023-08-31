from django.contrib.auth.models import User, Group, Permission
from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

from silant_app.models import (
    Car
)


class Command(BaseCommand):

    def handle(self, *args, **options):
        groupManager = Group.objects.get(name="manager")
        groupClient = Group.objects.get(name="client")
        groupOrganization = Group.objects.get(name="organization")

        print(Group.objects.all().values())
        print(f'groupManager- {groupManager}')
        print(f'groupManager Per- {groupManager.permissions}')

        print(f'groupOrganization- {groupOrganization}')
        print(f'groupClient- {groupClient}')

        print(Permission.objects.all().values())

        car_content_type = ContentType.objects.get_for_model(Car)
        add_car_permission = Permission.objects.get(codename="add_car", content_type=car_content_type)
        change_car_permission = Permission.objects.get(codename="change_car", content_type=car_content_type)
        print(f'car_content_type: {car_content_type}')
        print(f'add_permission: {add_car_permission}')
        print(f'change_permission: {change_car_permission}')

        groupManager.permissions.add(add_car_permission, change_car_permission)
        groupManager.save()
        print(f'car_content_type: {car_content_type}')
        print(f'groupManager- {groupManager}')
        print(f'groupManager Per- {groupManager.permissions}')

# except Exception as e:
#     print(f'Error: {e}')
