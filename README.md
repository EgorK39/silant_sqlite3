1. Копируем репозиторий:
   git clone git@github.com:EgorK39/silant_sqlite3.git
2. cd silant
3. Создаем виртуальное окружение:
   python3 -m venv venv
4. Запускаем окружение:
   source venv/bin/activate
5. устанавливаем зависимости:
   python -m pip install -r requirements.txt
6. Создаем файл .env в корне проекта и добавляем в него свои данные:
   SECRET_KEY="ключ django"
7. Запускаем сервер:
   python manage.py runserver
8. Переходим в папку FRONTEND:
   cd .. && cd FRONTEND
9. Выполняем команду:
   npm install
10. Запускаем веб-сервер:
    npm run start
11. в админке нужно обновить пароли у всех пользователей. Иначе не будет заходить.
    <h1>Данные для входа под супер-пользователем: логин: admin, пароль: 1234</h1>
12. Всем активным пользователям ставим в "Permissions" галочки в поле "Active".
13. При создании нового пользователя нужно обязательно добавить его в одну из групп (например, менеджера добавляем в
    группу "manager").

<hr>
Если БД нет или не хочет работать, то...
<h1>silant.dump.gz - архив с копией базы данных. Распаковать БД:  $ zcat silant.dump.gz | sqlite3 silant.sqlite3</h1>
<p>готово к использованию</p>
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
<h3>Копируем строчки ниже. Здесь мы наполняем БД начальными данными:
    Важно верно указать пути до местоположения каждлго из файлов. Пути должны быть абсолютными. Необходимо под себя
    немного подправить.</h3>

<ul>
<li>sqlite3 silant.sqlite3</li>
<li>.separator ";"</li>
<li>.headers on</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Users/users.txt auth_user</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Users/client.txt silant_app_modelofclients</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Users/company.txt silant_app_modelofservicecompany</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Car/car.txt Car</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Car/ModelOfControlledBridge.txt silant_app_modeloftransmission</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Car/ModelOfTechnic.txt silant_app_modeloftechnic</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Car/ModelOfEngine.txt silant_app_modelofengine</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Car/ModelOfDrivingBridge.txt silant_app_modelofdrivingbridge</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Car/ModelOfControlledBridge.txt silant_app_modelofcontrolledbridge</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Reclamation/reclamation.txt Reclamation</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Reclamation/Rejection.txt silant_app_rejection</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Reclamation/RecoveryMethod.txt silant_app_recoverymethod</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Reclamation/Reclamation_recovery.txt Reclamation_recovery</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/Reclamation/Reclamation_nodeOfRejection.txt Reclamation_nodeOfRejection</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/To/TypeOfTo.txt silant_app_typeofto</li>
<li>.import /mnt/d/USER/Documents/ALL_PROJECTS/silant_2_0/silant/DB_DATA/To/to.txt silant_app_to</li>
<li>.exit</li>
</ul>
<h3>Создаем базовые роли и распределяем существующих пользователей по группам:</h3>

<ul>
<li>python manage.py createroles</li>
</ul>
18. У меня предусмотрено 3 группы: manager, client и organization
19. Запускаем сервер:
    python manage.py runserver
20. Переходим в папку FRONTEND:
    cd .. && cd FRONTEND
21. Выполняем команду:
    npm install
22. Запускаем веб-сервер:
    npm run start
23. в админке нужно обновить пароли у всех пользователей. Иначе не будет заходить.
    <h1>Данные для входа под супер-пользователем: логин: admin, пароль: 1234</h1>
24. Всем активным пользователям ставим в "Permissions" галочки в поле "Active".
25. При создании нового пользователя нужно обязательно довабить его в одну из групп (например, менеджера добавляем в группу "manager").




