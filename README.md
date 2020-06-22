# NodeJs_Express_API_boilerPlate
This repo contains a CRUD (Create Read Update Delete) NodeJS boilerplate API containerized using Docker. It has been modularized to allow easier readability as well matches production-ready code and tests, giving you a good starting point to understand how to build an API and what to expect in the industry.

The API has is based on a platform with user management it contains 6 different routes each shows a different HTTP method. It uses a Mock Data JSON (javascript object notation) document as our Database.

- [NodeJs_Express_API_boilerPlate](#nodejs_express_api_boilerplate)
  - [Routes:](#routes)
      - [GET -> /api/v1/users](#get---apiv1users)
      - [PATCH -> /api/v1/user/update](#patch---apiv1userupdate)
      - [DELETE -> /api/v1/user/remove](#delete---apiv1userremove)
      - [POST -> /api/v1/image/upload](#post---apiv1imageupload)
      - [POST -> /api/v1/register](#post---apiv1register)
      - [POST -> /api/v1/login](#post---apiv1login)
  - [How to run npm:](#how-to-run-npm)
  - [How to run using docker:](#how-to-run-using-docker)
  - [How to run test:](#how-to-run-test)

## Routes:

#### GET -> /api/v1/users
This route returns a JSON response containing all the users from the MockData.Json.

#### PATCH -> /api/v1/user/update
This route allows you to pass an altered user JSON object and it will update the user details in the database. To perform this action you need to use an admin account and pass the token from the user account you want to perform this action.

#### DELETE -> /api/v1/user/remove
This route allows you to pass a user JSON object and remove the user details in the database. To perform this action you need to use an admin account and pass the token from the user account you want to perform this action.

#### POST -> /api/v1/image/upload
This route allows you to upload an image to the API which will be stored in /public/uploads. You need to pass the token from the user account you want to perform this action.

#### POST -> /api/v1/register
This route allows you to pass a user JSON object and add the user details in the database. To perform this action you need to use an admin account and pass the token from the user account you want to perform this action.

#### POST -> /api/v1/login
This route allows you to pass a user JSON object containing the email and password of the user and allow you to login. 

## How to run npm:
- Download or clone this repo
- Open in your chosen IDE, run the command npm  i in the terminal (make sure you're in this folder directory)
- In terminal run npm start, this will run the API on http://localhost:8080

## How to run using docker:
***(Make sure you have Docker installed)***

- Download or clone this repo
- Open docker-compose.yml and change the volumes path to where you have cloned this repo
- In terminal run docker-compose up this will start the API on http://localhost:80

## How to run test:
- Download or clone this repo
- Open in an IDE and run the command npm test

