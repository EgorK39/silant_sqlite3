Сервис имеет разный функционал для пользователей с разными ролями. Ключевой функционал:
выдача в виде таблицы информации из базы данных о машинах (технические характеристики, ТО, рекламации и пр.).

Сервис отображает в табличной форме данные из БД в зависимости от уровня прав доступа пользователей.
В проекте реализовано три уровня прав доступа пользователей, не считая простых пользователей без авторизации:
<ul>
<li>Клиент (client) имеет доступ к данным определённых машин. У каждой машины есть только один клиент.</li>
<li>Сервисная организация (organization) имеет доступ к данным определённых машин. У каждой машины только одна сервисная организация.</li>
<li>Менеджер  (manager) имеет доступ к данным по всем машинам, а также имеет возможность редактировать справочники.</li>
<li>Я принял решение оставить функционал superuser на каждом уровне прав доступа.</li>
<li>Все правила ограничений прав доступа реализованы на каждом из уровней приложения, как на backend, так и на frontend </li>
</ul> 

Сортировка данных в Таблицах по умолчанию проводиться по полям:
«дата отгрузки с завода» для таблицы «машина»;
<ul>
<li>Реализовано в модели "Car".</li>
<li>class Meta:</li>
<li>ordering = ['-dateOfShipment']</li>
</ul>
«дата проведения ТО» для таблицы «ТО»;
<ul>
<li>Реализовано в модели "TO".</li>
<li>class Meta:</li>
<li>ordering = ['-dateOfTo']</li>
</ul>
«дата отказа« для таблицы «рекламации».
<ul>
<li>Реализовано в модели "Reclamation".</li>
<li>class Meta:</li>
<li>ordering = ['-dateOfRejection']</li>
</ul>

В таблицах предусмотрена функция фильтрации по следующим полям:
модель техники,модель двигателя,модель трансмиссии,модель управляемого моста,
модель ведущего моста для таблицы «Машина», вид ТО, зав.номер машины,
сервисная компания для таблицы «ТО», узел отказа,способ восстановления,
сервисная компания для таблицы «Рекламация».
Логика фильтрации реализована по вышеуказанным полям на серверной части проекта.

Строки в таблице кликабельны и ведут на страницу с отображением полных данных,
включая поле «описание» сущностей, которые задаются в справочниках.
<ul>
<li>Кликабельны все поля в таблице, чья сущность описана на backend в моделях</li>
<li>Можно кликнуть и перейти на страницу с отображением полных данных о:
"Модель техники", "Модель двигателя", "Модель трансмиссии", "Модель ведущего моста"
"Модель управляемого моста", "Клиент", "Сервисная компания", "Вид ТО"
"Организация, проводившая ТО", "Машина", "Узел отказа", "Способ восстановления"</li>
</ul>

Авторизация проводиться по логину и паролю, которые назначаются администратором системы.
Для авторизации пользователей использовал JSON Web Token.
Пользователь не может самостоятельно поменять логин и/или пароль.

В соответствии с ТЗ на сайте отсутствует фунция регистрации для пользователей. Администратор может создавать
пользователя в админ панели.
При создании нового пользователя необходимо его добавить в одну из предложенных групп: Клиент (client), Сервисная
организация (organization) или Менеджер  (manager).
В зависимости от выбранной группы пользователь получит соответствующие права доступа.

Пользователь без авторизации может получить ограниченную информацию о комплектации машины. Предусмотрена также
фильтрация по заводскому номеру машины.

Результат поиска: таблица с данными по определённой машине со следующими полями: таблица «Машина» (поля 1–10).
Если данные по заводскому номеру не найдены, то выдается сообщение, что данных о машине с таким заводским номером нет в
системе.

Авторизованные пользователи имеют разный доступ к данным, получают таблицы с данными обо всех доступных им машинах.
Данные располагаются на нескольких вкладках (согласно таблицам «Машина», «ТО», «Рекламации»):
технические данные,ТО и рекламации.
Возможность внесения изменений для пользователей с разными ролями реализована согласно ТЗ.

<hr>
<h3>Варианты запуска приложения</h3>

1. Копируем репозиторий:
   git clone git@github.com:EgorK39/silant_sqlite3.git
2. cd silant_sqlite3
3. Создаем виртуальное окружение:
   python3 -m venv venv
4. Запускаем окружение:
   source venv/bin/activate
5. устанавливаем зависимости:
   python -m pip install -r requirements.txt
6. Создаем файл .env в корне проекта и добавляем в него свои данные:
   SECRET_KEY="ключ django"
7. cd silant
8. Запускаем сервер:
   python manage.py runserver
9. Переходим в папку FRONTEND:
   cd .. && cd FRONTEND
10. Выполняем команду:
    npm install
11. Запускаем веб-сервер:
    npm run start
12. Желательно в админке обновить пароли у пользователей. На данный момент все пользователи имеют пароль: qwerty
    <h3>Данные для входа под супер-пользователем: логин: admin, пароль: 1234</h3>
13. При создании нового пользователя нужно обязательно добавить его в одну из групп (например, менеджера добавляем в
    группу "manager").

<hr>
Если БД нет или не хочет работать, то...
<h2>silant.dump.gz - архив с копией базы данных. Распаковать БД:  $ zcat silant.dump.gz | sqlite3 silant.sqlite3</h2>
<p>готово к использованию</p>
Осталось запустить сервер

<hr>
<p>или можно пойти длинным путем</p>
<ol>
<li>$ sudo apt update</li>
<li>(при желании) $ sudo apt upgrade</li>\
<li>$ sudo apt install sqlite3</li>
<li>touch silant.sqlite3</li>
<li>cd silant</li>
<li>
<ul>
<li>Делаем миграции:</li>
    <li>python manage.py makemigrations</li>
    <li>python manage.py migrate</li>
</ul>
</li>
    <li>Создаем супер-пользователя КОМАНДОЙ:</li>
    <li>python manage.py makesuperuser</li>
<li>Запускаем БД:</li>
<li>sqlite3 silant.sqlite3</li>
</ol> 
<h3>Копируем строчки ниже. Здесь мы наполняем БД приложения исходными данными:
    Важно верно указать пути до местоположения каждого из файлов. Пути должны быть абсолютными. Необходимо под себя подогнать.</h3>

<ul>
<li>sqlite3 silant.sqlite3</li>
<li>.separator ";"</li>
<li>.headers on</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Users/users.txt auth_user</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Users/client.txt silant_app_modelofclients</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Users/company.txt silant_app_modelofservicecompany</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Car/car.txt Car</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Car/ModelOfTransmission.txt silant_app_modeloftransmission</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Car/ModelOfTechnic.txt silant_app_modeloftechnic</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Car/ModelOfEngine.txt silant_app_modelofengine</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Car/ModelOfDrivingBridge.txt silant_app_modelofdrivingbridge</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Car/ModelOfControlledBridge.txt silant_app_modelofcontrolledbridge</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Reclamation/reclamation.txt Reclamation</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Reclamation/Rejection.txt silant_app_rejection</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Reclamation/RecoveryMethod.txt silant_app_recoverymethod</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Reclamation/Reclamation_recovery.txt Reclamation_recovery</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/Reclamation/Reclamation_nodeOfRejection.txt Reclamation_nodeOfRejection</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/To/TypeOfTo.txt silant_app_typeofto</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_3_0/silant_sqlite3/DB_DATA/To/to.txt silant_app_to</li>
<li>.exit</li>
</ul>
<h3>Создаем базовые роли, распределяем существующих пользователей по группам, обновляем пароли и делаем пользователей активными.</h3>
<ul>
<li><h1>python manage.py createroles</h1></li>
</ul>

1. У меня предусмотрено 3 группы: manager, client и organization
2. Запускаем сервер:
   python manage.py runserver
3. Переходим в папку FRONTEND:
   cd .. && cd FRONTEND
4. Выполняем команду:
   npm install
5. Запускаем веб-сервер:
   npm run start
6. в админке при желании можно обновить пароли у пользователей. На данный момент все пользователи имеют пароль: qwerty
   Данные для входа под супер-пользователем: логин: admin, пароль: 1234
7. При создании нового пользователя нужно обязательно довабить его в одну из групп (например, менеджера добавляем в
   группу "manager").




