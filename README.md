# Notification Service

Server that sends out user notifications based on getting a message. It exposes endpoints for managing notification preferences.
It leverages AWS SNS pub/sub mechanism to send email notifications and Socket.IO to deliver real time in-app notifications.

## API DOCS

<!-- [Swagger UI](https://tshirtshop-api.herokuapp.com/) -->

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/collections/07993574ca6f8b26069e)

## Enpoints summary

- `POST /api/auth/signup` Register a user account
- `POST /api/auth/signin` Login a user account
- `GET /api/notifications` Get notifications the login user subscribes
- `GET /api/notifications/publish` Send message to subscribers of a topic
- `GET /api/notifications/subscriptions` Get login user subscribed topics
- `POST /api/notifications/topics` Create subscription topic
- `GET /api/notifications/topics` List all subscription topics
- `POST /api/notifications/subscribe` Subscribe to a topic
- `DELETE /api/notifications/unsubscribe` Unsubscribe from a topic

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
