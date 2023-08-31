# Generated by Django 4.2.4 on 2023-08-31 20:54

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.db.models.manager


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Car',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('vin', models.CharField(db_column='Зав. № машины', max_length=220, unique=True)),
                ('engineNo', models.CharField(db_column='Зав. № двигателя', max_length=220, unique=True)),
                ('transmissionNo', models.CharField(db_column='Зав. № трансмиссии', max_length=220, unique=True)),
                ('drivingBridgeNo', models.CharField(db_column='Зав. № ведущего моста', max_length=220, unique=True)),
                ('controlledBridgeNo', models.CharField(db_column='Зав. № управляемого моста', max_length=220, unique=True)),
                ('contract', models.CharField(blank=True, db_column='Договор поставки №, дата', max_length=255, null=True)),
                ('dateOfShipment', models.DateField(db_column='Дата отгрузки с завода')),
                ('consignee', models.CharField(db_column='Грузополучатель', max_length=188)),
                ('deliveryAddress', models.CharField(db_column='Адрес поставки', max_length=255)),
                ('equipment', models.CharField(db_column='Комплектация', max_length=180)),
            ],
            options={
                'db_table': 'Car',
                'ordering': ['-dateOfShipment'],
            },
        ),
        migrations.CreateModel(
            name='ModelOfControlledBridge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=124, unique=True)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ModelOfDrivingBridge',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=124, unique=True)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ModelOfEngine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=124, unique=True)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ModelOfServiceCompany',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=124, unique=True)),
                ('description', models.TextField()),
                ('namesOfUsers', models.OneToOneField(help_text='Можно добавить только организацию', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            managers=[
                ('company', django.db.models.manager.Manager()),
            ],
        ),
        migrations.CreateModel(
            name='ModelOfTechnic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=124, unique=True)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='ModelOfTransmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=124, unique=True)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='RecoveryMethod',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=124, unique=True)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Rejection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=124, unique=True)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='TypeOfTo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=124, unique=True)),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='TO',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateOfTo', models.DateField(db_column='Дата проведения ТО')),
                ('work', models.IntegerField(db_column='Наработка, м/час', default=0)),
                ('order', models.CharField(db_column='№ заказ-наряда', max_length=124)),
                ('dateOfOrder', models.DateField(db_column='Дата заказ-наряда')),
                ('car', models.ForeignKey(db_column='Машина', on_delete=django.db.models.deletion.CASCADE, to='silant_app.car')),
                ('serviceCompany', models.ForeignKey(db_column='Сервисная компания', on_delete=django.db.models.deletion.CASCADE, to='silant_app.modelofservicecompany')),
                ('to', models.ForeignKey(db_column='Вид ТО', on_delete=django.db.models.deletion.CASCADE, to='silant_app.typeofto')),
                ('whoMakeTo', models.ForeignKey(db_column='Организация, проводившая ТО', on_delete=django.db.models.deletion.CASCADE, related_name='org', to='silant_app.modelofservicecompany')),
            ],
            options={
                'ordering': ['-dateOfTo'],
            },
        ),
        migrations.CreateModel(
            name='Reclamation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dateOfRejection', models.DateField(db_column='Дата отказа')),
                ('work', models.IntegerField(db_column='Наработка, м/час', default=0)),
                ('description', models.TextField(db_column='Описание отказа')),
                ('spareParts', models.TextField(blank=True, db_column='Используемые запасные части', null=True)),
                ('DateOfRestoration', models.DateField(db_column='Дата восстановления')),
                ('downtime', models.IntegerField(blank=True, db_column='Время простоя техники', null=True)),
                ('car', models.ForeignKey(db_column='Mашина', on_delete=django.db.models.deletion.CASCADE, to='silant_app.car')),
                ('nodeOfRejection', models.ManyToManyField(db_column='Узел отказа', to='silant_app.rejection')),
                ('recovery', models.ManyToManyField(db_column='Способ восстановления', to='silant_app.recoverymethod')),
                ('serviceCompany', models.ForeignKey(db_column='Сервисная компания', on_delete=django.db.models.deletion.CASCADE, to='silant_app.modelofservicecompany')),
            ],
            options={
                'db_table': 'Reclamation',
                'ordering': ['-dateOfRejection'],
            },
        ),
        migrations.CreateModel(
            name='ModelOfClients',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=124, unique=True)),
                ('description', models.TextField()),
                ('namesOfUsers', models.OneToOneField(help_text='Можно добавить только клиентов', on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            managers=[
                ('client', django.db.models.manager.Manager()),
            ],
        ),
        migrations.AddField(
            model_name='car',
            name='client',
            field=models.ForeignKey(db_column='Клиент', on_delete=django.db.models.deletion.CASCADE, to='silant_app.modelofclients'),
        ),
        migrations.AddField(
            model_name='car',
            name='controlledBridge',
            field=models.ForeignKey(db_column='Модель управляемого моста', on_delete=django.db.models.deletion.CASCADE, to='silant_app.modelofcontrolledbridge'),
        ),
        migrations.AddField(
            model_name='car',
            name='drivingBridge',
            field=models.ForeignKey(db_column='Модель ведущего моста', on_delete=django.db.models.deletion.CASCADE, to='silant_app.modelofdrivingbridge'),
        ),
        migrations.AddField(
            model_name='car',
            name='engine',
            field=models.ForeignKey(db_column='Модель двигателя', on_delete=django.db.models.deletion.CASCADE, to='silant_app.modelofengine'),
        ),
        migrations.AddField(
            model_name='car',
            name='serviceCompany',
            field=models.ForeignKey(db_column='Сервисная компания', on_delete=django.db.models.deletion.CASCADE, to='silant_app.modelofservicecompany'),
        ),
        migrations.AddField(
            model_name='car',
            name='technic',
            field=models.ForeignKey(db_column='Модель техники', on_delete=django.db.models.deletion.CASCADE, to='silant_app.modeloftechnic'),
        ),
        migrations.AddField(
            model_name='car',
            name='transmission',
            field=models.ForeignKey(db_column='Модель трансмиссии', on_delete=django.db.models.deletion.CASCADE, to='silant_app.modeloftransmission'),
        ),
    ]
