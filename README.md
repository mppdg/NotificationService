# Notification Service

Server that sends out user notifications based on getting a message. It exposes endpoints for managing notification preferences.
It leverages AWS SNS pub/sub mechanism to send email notifications and Socket.IO to deliver real time in-app notifications.

## API DOCS

<!-- [Swagger UI](https://tshirtshop-api.herokuapp.com/) -->

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/07993574ca6f8b26069e)

## Enpoints summary

See API reference at this page bottom

- `POST /api/auth/signup` Register a user account
- `POST /api/auth/signin` Login a user account
- `GET /api/notifications` Get notifications the login user subscribes
- `POST /api/notifications/publish` Send message to subscribers of a topic
- `GET /api/notifications/subscriptions` Get login user subscribed topics
- `POST /api/notifications/topics` Create subscription topic
- `GET /api/notifications/topics` List all topics
- `POST /api/notifications/subscribe` Subscribe to a topic
- `DELETE /api/notifications/unsubscribe` Unsubscribe from a topic

#### Sock.io

- `/io/socket/notifications` Socket connection hub
- `receive-message:{topic}` Receives message from `topic` subscribers
- `send-message:{topic}` Send message to a `topic` subscribers

## Languages/Technologies

- Javascript
- [Typescript](https://www.typescriptlang.org)
- [Nodejs](https://nodejs.org)
- [Express](https://github.com/expressjs/express)
- [AWS SNS](https://aws.amazon.com/sns/)
- [Socket.io](https://socket.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Sequelize](http://docs.sequelizejs.com/)
- [JSONWebToken](https://www.npmjs.com/package/jsonwebtoken)
- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)

## Installation

Follow the steps below to setup a local development environment, make sure to have `Nodejs` and `PostgreSQL` (or the connection string) installed.

1.  Clone the repository from a terminal `git clone https://github.com/mppdg/NotificationService.git`.
2.  Navigate to the project directory
3.  Run `yarn install` on the terminal to install dependencies.
4.  Change `.env-sample` to `.env` and provide the necessary credentials.
5.  Run `yarn run dev` to start the application in development mode.

## Project Structure

### Top level directories

- `/src` - holds the source code directories and files
- `/src/index.ts` - application's entry point and server
- `/src/routes/` - contains the route definitions
- `/src/controllers/` - contains controllers
- `/src/models/` - holds the database models
- `/src/utils` - consist of helpers, middleware, services and constants
- `/src/interface` - holds type definition

### Environmental variables

| Variable              |                              Description                               |                       Example                        |
| --------------------- | :--------------------------------------------------------------------: | :--------------------------------------------------: |
| DATABASE_URL          |                     The database connection string                     | postgres://username:password@host:port/database_name |
| AUTH_SECRET           |      The private key used for generating and verifying JWT token       |               mustbesecretblahblahblah               |
| AWS_ACCESS_KEY_ID     |                          AWS user access key                           |               B9B9B9B9B99B9B9B9B9B9B9B               |
| AWS_SECRET_ACCESS_KEY |                          AWS user secret key                           |              hufia6@9!8y8y8y9bada98u98a              |
| AWS_REGION            |                           AWS service region                           |                      us-east-1                       |
| AWS_SNS_ARN           | The first 5 component of SNS Amazon Resource Number . Serves as prefix |           arn:aws:sns:us-east-1:9898989898           |

## API reference

### Register

##### Request example

`POST /api/auth/signup`

```source-json
{
  "firstName": "Femi",
  "lastName": "Lawal",
  "email": "youremail@domain.com",
  "password": "yourpassword"
}
```

##### Reponse example

`200 OK`

```source-json
{
    "success": true,
    "message": "Sign up successful",
    "data": {
        "id": "ee21a3c8-71ba-4875-a36d-977f5a02023e",
        "email": "youremail@domain.com",
        "firstName": "Femi",
        "lastName": "Lawal",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlMjFhN2M4LTcxYmEtNDg3NS1hMzZkLTk3N2Y1YTAyMDIzZSIsImVtYWlsIjoibXBwZGdyZWF0QGdtYWlsLmNvbSIsImlhdCI6MTYwMzgxNTY1MiwiZXhwIjoxNjA0MDc0ODUyfQ.pp1QYZ_kOYIGSk5F442btz5vN8_1K2mbLinWy48LX0"
    }
}
```

`409 CONFLICT`

```source-json
{
    "success": false,
    "error": {
        "message": "Email already exist"
    }
}
```

### Login

##### Request example

`POST /api/auth/signin`

```source-json
{
  "email": "youremail@domain.com",
  "password": "yourpassword"
}
```

##### Reponse example

200 OK

```source-json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "id": "ee21a3c8-71ba-4875-a36d-977f5a02023e",
        "email": "youremail@domain.com",
        "firstName": "Femi",
        "lastName": "Lawal",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlMjFhN2M4LTcxYmEtNDg3NS1hMzZkLTk3N2Y1YTAyMDIzZSIsImVtYWlsIjoibXBwZGdyZWF0QGdtYWlsLmNvbSIsImlhdCI6MTYwMzgxNTY1MiwiZXhwIjoxNjA0MDc0ODUyfQ.pp1QYZ_kOYIGSk5F442btz5vN8_1K2mbLinWy48LX0"
    }
}
```

400 BAD REQUEST

```source-json
{
    "success": false,
    "error": {
        "message": "Email or password not correct"
    }
}
```

### Get notifications on subscribed topics

##### Request example

`GET /api/notifications`

```source-json

```

##### Reponse example

200 OK

```source-json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": "e1b8e679-1688-41d9-83c1-85e8c191f7b2",
      "message": "This is a message to topic subscribers",
      "topic": "NEWSLETTER",
      "topicArn": "arn:aws:sns:us-east-1:898989898989:NEWSLETTER",
      "senderId": "36a1490b-8d40-4c31-9ccf-72bcf47fea82",
      "createdAt": "2020-10-26T17:28:41.144Z",
      "updatedAt": "2020-10-26T17:28:41.144Z",
      "sender": {
        "id": "ee21a3c8-71ba-4875-a36d-977f5a02023e",
        "email": "youremail@domain.com",
        "firstName": "Femi",
        "lastName": "Lawal"
      }
    }
  ]
}
```

### Publish message to a topic

##### Request example

`POST /api/notifications/publish`

```source-json
{
  "topicName": "newsletter",
  "message": "This is a message to topic subscribers"
}
```

##### Reponse example

200 OK

```source-json
{
  "success": true,
  "message": "Message sent to 'NEWSLETTER' subscribers"
}
```

404 NOT FOUND

```source-json
{
  "success": false,
  "error": {
    "message": "Topic does not exist"
  }
}
```

### Create a subscription topic

##### Request example

`POST /api/notifications/topics`

```source-json
{
  "topicName": "Newsletter"
}
```

##### Reponse example

200 OK

```source-json
{
    "success": true,
    "data": {
        "topicArn": "arn:aws:sns:us-east-1:898989898989:NEWSLETTER"
    }
}
```

### List all topics

##### Request example

`GET /api/notifications/topics`

```source-json

```

##### Reponse example

200 OK

```source-json
{
  "success": true,
  "data": [
    {
      "topicArn": "arn:aws:sns:us-east-1:898989898989:NEWSLETTER",
      "topicName": "NEWSLETTER"
    },
    {
      "topicArn": "arn:aws:sns:us-east-1:898989898989:SOFTWARE",
      "topicName": "SOFTWARE"
    }
  ]
}
```

### List user's subscriptions

##### Request example

`GET /api/notifications/subscriptions`

```source-json

```

##### Reponse example

200 OK

```source-json
{
  "success": true,
  "message": "Success",
  "data": [
      {
          "id": "0c8659e6-b692-4fc6-8a7-3174e8792976",
          "topic": "NEWSLETTER",
          "topicArn": "arn:aws:sns:us-east-1:177065589298:NEWSLETTER",
          "subscriberId": "36a14b-8d40-4c31-9ccf-72bcf47fea82",
          "createdAt": "2020-10-26T17:28:12.300Z",
          "updatedAt": "2020-10-26T17:28:12.300Z"
      }
  ]
}
```

### Subscribe to a topic

##### Request example

`POST /api/notifications/subscribe`

```source-json
{
  "topicName": "newsletter"
}
```

##### Reponse example

201 CREATED

```source-json
{
  "success": true,
  "message": "Check your email for 'AWS Notification' to confirm subscription. You may check 'SPAM' or 'JUNK' folder if not in inbox",
  "data": {
    "subscription": "pending confirmation"
  }
}
```

409 CONFLICT

```source-json
{
  "success": false,
  "error": {
    "message": "You're already subscribed to 'NEWSLETTER'"
  }
}
```

### Delete a subscription

##### Request example

`DELETE /api/notifications/unsubscribe`

```source-json
{
  "topicName": "newsletter"
}
```

##### Reponse example

200 OK

```source-json
{
    "success": true,
    "message": "You have unsubscribed from 'NEWSLETTER'",
    "data": {}
}
```

404 NOT FOUND

```source-json
{
    "success": false,
    "error": {
        "message": "It seems you are not subscribed to 'NEWSLETTER'. Unsubscription not neccessary"
    }
}
```

404 NOT FOUND

```source-json
{
    "success": false,
    "error": {
        "message": "Your subcription to 'NEWSLETTER' is pending confirmation. Unsubscription not neccessary"
    }
}
```
