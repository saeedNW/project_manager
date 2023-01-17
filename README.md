# project management

a simple project and team management application

***

### node.js and express OOP project management application

### project [trello board](https://trello.com/b/sKfPuJ0u/project-management)

***

### Requirements

+ basic requirements
    + Git installed
    + Node.js
    + MongoDB

***

### launching steps

1. clone application

```shell
git clone https://github.com/saeedNW/project_manager.git
```

2. dependencies installation

```shell
npm install
```

3. run application:
   in order to run application you first need to set your application **port** and **mongodb connection string**
   in ```server.js``` file, if you wish to use something except default port and connection string

``` default port: 3000```
``` default mongodb connection string: mongodb://127.0.0.1:27017/project_management```

```shell
# run in product environment
npm start # it will start application with "node server.js" command

# run in development environment
npm run dev # it will start application with "nodemon -L server.js" command
```

4. registration: in order to register you can use **postman** to create a post request
   to ```http://localhost:3000/auth/register``` or **auth http request** file in **requests** folder

register required data example

```json
{
  "username": "your_username",
  "email": "your_email@your_email.com",
  "phone": "0917*******",
  "password": "your_password",
  "confirmPassword": "your_password"
}
```

5. login and get access token: in order to log in and get an access token you can use **postman** to create a post
   request to ```http://localhost:3000/auth/login```  or **auth http request** file in **requests** folder

login required data example

```json
{
  "username": "your_username",
  "password": "your_password"
}
```

### Note #1: after logging into system you need to copy your access token and replace it with access token in http request files.

if you're using a code editor such as ```VSCode``` or other code editor which support using environment variables in
http files, you can also save your access token in ```.env``` file and call the ENV variable instead of replacing the
whole token in http files.

http request with access token example

```http request
### get user profile (in editors which doesn't support ENV variables in http files)
GET http://localhost:3000/user/profile
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNOVzEzIiwiaWF0IjoxNjczNDM0NzMwLCJleHAiOjE3MDQ5NzA3MzB9.DNO0kV3GcwMui02LOmUt14VPlCBIIqyymvJWAxqdCog

### get user profile (in editors which does support ENV variables in http files such as VSCode)
GET http://localhost:3000/user/profile
Content-Type: application/json
Authorization: Bearer {{$dotenv token}}
```

#### your access token is valid for 1 year

***

### project [documentation and wiki](#) (will be added once it's done)
