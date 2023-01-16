## Install

Clone repo git clone https://github.com/elMP/simple-crud-api.git -b task3-simple-crud-api

## Run

Change directory to simple-crud-api  
Run npm install
Run command node index.js

View message in console: Server is running on http://localhost:4000

Now server is running on port 8000

To change port edit PORT variable in .env file

## Usage

You can test next functions:

1. Get all users. Run GET request http://localhost:8000/users/
   Before adding users you get empty array.

2. Get user by UUID. Run GET request http://localhost:8000/person/{UUID} where
   {UUID} - user id

3. Add user. Run POST request http://localhost:8000/users/
   Required fields:
   username - string
   age - number
   hobbies - array of string

4. Delete user. Run DELETE request http://localhost:8000/person/{UUID} where
   {UUID} - user id

5. Update person. Run PUT request http://localhost:8000/person/{UUID} where
   {UUID} - user id  
   Required fields:
   username - string
   age - number
   hobbies - array of string
