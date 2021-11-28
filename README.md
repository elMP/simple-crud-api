## Установка
Склонировать репозиторий git clone https://github.com/elMP/simple-crud-api.git -b task3-simple-crud-api

## Запуск
Перейти в созданный при установке каталог simple-crud-api  
Выполнить команду node index.js   

В консоли будет получено сообщение Server is running on http://localhost:8000  

Приложение запустится на 8000 порту  

## Использование

Доступны следующие функции:

1. Получить данные о всех person. Для этого выполнить GET запрос http://localhost:8000/person/
До добавления записей будет получен пустой ответ.

2. Получить данные о конкретном person. Для этого выполнить GET запрос http://localhost:8000/person/{UUID} где
{UUID} - id конкретной записи

3. Добавить person. Для этого выполнить POST запрос http://localhost:8000/person/
Обязательные поля:
name - строка
age - число
hobbies - массив строк

4. Удалить person. Для этого выполнить DELETE запрос http://localhost:8000/person/{UUID} где
{UUID} - id конкретной записи

5. Обновить person. Для этого выполнить PUT запрос http://localhost:8000/person/{UUID} где
{UUID} - id конкретной записи
