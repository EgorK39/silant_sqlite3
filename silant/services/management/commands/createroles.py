from django.contrib.auth.models import User, Group, Permission
from django.core.management.base import BaseCommand


class Command(BaseCommand):

    def handle(self, *args, **options):

        users = User.objects.all()
        groups = Group.objects.all()
        perm = Permission.objects.all()
        try:
            if users:
                print(f'Users: {users}')
                for i in users:
                    print(i.is_superuser)
                    print(i.id)
                    print(i.pk)
                    print(i.username)
                    print(f'gr:{i.groups.filter(name="manager").exists()}')
                    print(f'gr:{i.groups.all()}')

                    # TODO < объект_пользователя >.groups.filter(name__in=['Имя_группы_1', 'Имя_группы_2']).exists() TODO

                    print(f'gr:{i.groups.name}')
                    print(f'gr:{i.get_group_permissions()}')

                    print('User.objects.filter(groups="organization")')

                print(f'Groups: {groups}')
            else:
                print('empty')
            if groups and not groups.count() < 3:
                print(f'Groups: {groups}')
                print(f'Groups: {groups.count()}')
                for i in groups:
                    print(f'{i.name} - {i.permissions}')
            else:
                Group.objects.create(name="manager")
                Group.objects.create(name="client")
                Group.objects.create(name="organization")

            if perm:
                print(perm)
            else:
                print(f'perm is empty')
            clients_list = ['ip_trudnikov', 'fpk21', 'mns77',
                            'ransky_lph', 'complekt_postavka',
                            'rmk', 'zander']
            company_list = ['prom_teh',
                            'silant', 'fns', 'by_yourself']
            print(f'count: {User.objects.all().count()}')
            for i in User.objects.all():
                clientGr = Group.objects.get(name="client")
                comGr = Group.objects.get(name="organization")

                if i.username in clients_list:
                    print(f'clients_list: {i.username}')
                    i.groups.add(clientGr)
                    i.save()
                    # print(f'clients_list groups: {i.groups.name}')

                elif i.username in company_list:
                    print(f'company_list: {i.username}')
                    i.groups.add(comGr)
                    i.save()
                    # print(f'company_list groups: {i.groups.name}')

                else:
                    print('ok')






        except Exception as e:
            print(f'Error: {e}')
