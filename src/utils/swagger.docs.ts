export default {
  "swagger": "2.0",
  "info": {
    "version": "1.0",
    "title": "Notification Services",
    "contact": {}
  },
  "host": "https://mppdg-notification-service.herokuapp.com",
  "basePath": "/api",
  "securityDefinitions": {
    "Bearer": {
      "type": "apiKey",
      "name": "Authorization",
      "in": "header",
      "default": "Bearer {token}"
    }
  },
  "schemes": [
    "https",
    "http"
  ],
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/notifications/topics": {
      "post": {
        "summary": "create topic",
        "tags": [
          "notifications"
        ],
        "operationId": "createtopic",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          },
          {
            "name": "Body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/createtopicrequest"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/200OK"
            },
            "examples": {
              "application/json": {
                "success": true,
                "data": {
                  "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER"
                }
              }
            },
            "headers": {}
          }
        }
      },
      "get": {
        "summary": "list topics",
        "tags": [
          "notifications"
        ],
        "operationId": "listtopics",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/2000K"
            },
            "examples": {
              "application/json": {
                "success": true,
                "data": [
                  {
                    "topicArn": "arn:aws:sns:us-east-1:89898989898:Default_CloudWatch_Alarms_Topic",
                    "topicName": "Default_CloudWatch_Alarms_Topic"
                  },
                  {
                    "topicArn": "arn:aws:sns:us-east-1:89898989898:Entertainment",
                    "topicName": "Entertainment"
                  },
                  {
                    "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER",
                    "topicName": "NEWSLETTER"
                  },
                  {
                    "topicArn": "arn:aws:sns:us-east-1:89898989898:SOFTWARE",
                    "topicName": "SOFTWARE"
                  }
                ]
              }
            },
            "headers": {}
          },
          "401": {
            "description": "Unauthorized",
            "schema": {
              "$ref": "#/definitions/404BADREQUEST"
            },
            "examples": {
              "application/json": {
                "success": false,
                "error": {
                  "message": "Authentication failed"
                }
              }
            }
          }
        }
      }
    },
    "/notifications/subscribe": {
      "post": {
        "summary": "subscribe",
        "tags": [
          "notifications"
        ],
        "operationId": "subscribe",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          },
          {
            "name": "Body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/subscriberequest"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/201CREATED"
            },
            "examples": {
              "application/json": {
                "success": true,
                "message": "Check your email for 'AWS Notification' to confirm subscription. You may check 'SPAM' or 'JUNK' folder if not in inbox",
                "data": {
                  "subscription": "pending confirmation"
                }
              }
            },
            "headers": {}
          },
          "409": {
            "description": "Conflict",
            "schema": {
              "$ref": "#/definitions/404BADREQUEST"
            },
            "examples": {
              "application/json": {
                "success": false,
                "error": {
                  "message": "You're already subscribed to 'NEWSLETTER'"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "schema": {
              "$ref": "#/definitions/404BADREQUEST"
            },
            "examples": {
              "application/json": {
                "success": false,
                "error": {
                  "message": "Invalid parameter: TopicArn Reason: An ARN must have at least 6 elements, not 2"
                }
              }
            }
          },
          "401": {
            "description": "Unauthorized",
            "schema": {
              "$ref": "#/definitions/404BADREQUEST"
            },
            "examples": {
              "application/json": {
                "success": false,
                "error": {
                  "message": "Authentication failed"
                }
              }
            }
          }
        }
      }
    },
    "/notifications/unsubscribe": {
      "delete": {
        "summary": "unsubscribe",
        "tags": [
          "notifications"
        ],
        "operationId": "unsubscribe",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          },
          {
            "name": "Body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/unsubscriberequest"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/200OK1"
            },
            "examples": {
              "application/json": {
                "success": true,
                "message": "You have unsubscribed from 'NEWSLETTER'",
                "data": {}
              }
            },
            "headers": {}
          },
          "401": {
            "description": "Unauthorized",
            "schema": {
              "$ref": "#/definitions/404BADREQUEST"
            },
            "examples": {
              "application/json": {
                "success": false,
                "error": {
                  "message": "Authentication failed"
                }
              }
            }
          },
          "404": {
            "description": "Not Found",
            "schema": {
              "$ref": "#/definitions/404BADREQUEST"
            },
            "examples": {
              "application/json": {
                "success": false,
                "error": {
                  "message": "Your subcription to 'NEWSLETTER' is pending confirmation. Unsubscription not neccessary"
                }
              }
            }
          }
        }
      }
    },
    "/notifications/publish": {
      "post": {
        "summary": "publish",
        "tags": [
          "notifications"
        ],
        "operationId": "publish",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          },
          {
            "name": "Body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/publishrequest"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/200OK2"
            },
            "examples": {
              "application/json": {
                "success": true,
                "message": "Message sent to 'NEWSLETTER' subscribers"
              }
            },
            "headers": {}
          },
          "404": {
            "description": "Not Found",
            "schema": {
              "$ref": "#/definitions/404BADREQUEST"
            },
            "examples": {
              "application/json": {
                "success": false,
                "error": {
                  "message": "Topic does not exist"
                }
              }
            }
          }
        }
      }
    },
    "/notifications": {
      "get": {
        "summary": "get notifications",
        "tags": [
          "notifications"
        ],
        "operationId": "getnotifications",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/200OK3"
            },
            "examples": {
              "application/json": {
                "success": true,
                "message": "Success",
                "data": [
                  {
                    "id": "e1b8ee79-1688-41d9-83c1-85e8c191f7b2",
                    "message": "This is a message to all subscribers",
                    "topic": "NEWSLETTER",
                    "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER",
                    "senderId": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
                    "createdAt": "2020-10-26T17:28:41.144Z",
                    "updatedAt": "2020-10-26T17:28:41.144Z",
                    "sender": {
                      "id": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
                      "firstName": "Bobby",
                      "lastName": "Pascal",
                      "email": "myemail@domain.com",
                      "createdAt": "2020-10-26T00:21:31.619Z",
                      "updatedAt": "2020-10-26T00:21:31.619Z"
                    }
                  },
                  {
                    "id": "3a67e4e5-8366-43a5-a8cd-e4772223d597",
                    "message": "This is a message to all subscribers",
                    "topic": "NEWSLETTER",
                    "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER",
                    "senderId": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
                    "createdAt": "2020-10-26T17:30:35.837Z",
                    "updatedAt": "2020-10-26T17:30:35.837Z",
                    "sender": {
                      "id": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
                      "firstName": "Bobby",
                      "lastName": "Pascal",
                      "email": "myemail@domain.com",
                      "createdAt": "2020-10-26T00:21:31.619Z",
                      "updatedAt": "2020-10-26T00:21:31.619Z"
                    }
                  },
                  {
                    "id": "55829454-3f4a-4d7c-9de7-758692f4fb97",
                    "message": "Another message to this subscriber",
                    "topic": "NEWSLETTER",
                    "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER",
                    "senderId": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
                    "createdAt": "2020-10-26T17:31:05.149Z",
                    "updatedAt": "2020-10-26T17:31:05.149Z",
                    "sender": {
                      "id": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
                      "firstName": "Bobby",
                      "lastName": "Pascal",
                      "email": "myemail@domain.com",
                      "createdAt": "2020-10-26T00:21:31.619Z",
                      "updatedAt": "2020-10-26T00:21:31.619Z"
                    }
                  }
                ]
              }
            },
            "headers": {}
          },
          "401": {
            "description": "Unauthorized",
            "schema": {
              "$ref": "#/definitions/404BADREQUEST"
            },
            "examples": {
              "application/json": {
                "success": false,
                "error": {
                  "message": "Authentication failed"
                }
              }
            }
          }
        }
      }
    },
    "/notifications/subscriptions": {
      "get": {
        "summary": "get subscriptions",
        "tags": [
          "notifications"
        ],
        "operationId": "getsubscriptions",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/200OK4"
            },
            "examples": {
              "application/json": {
                "success": true,
                "message": "Success",
                "data": [
                  {
                    "id": "0c8659e6-b692-4fc6-83a7-3174e8792976",
                    "topic": "NEWSLETTER",
                    "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER",
                    "subscriberId": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
                    "createdAt": "2020-10-26T17:28:12.3Z",
                    "updatedAt": "2020-10-26T17:28:12.3Z"
                  }
                ]
              }
            },
            "headers": {}
          },
          "401": {
            "description": "Unauthorized",
            "schema": {
              "$ref": "#/definitions/404BADREQUEST"
            },
            "examples": {
              "application/json": {
                "success": false,
                "error": {
                  "message": "Authentication failed"
                }
              }
            }
          }
        }
      }
    },
    "/auth/signup": {
      "post": {
        "summary": "signup",
        "tags": [
          "auth"
        ],
        "operationId": "signup",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          },
          {
            "name": "Body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/signuprequest"
            }
          }
        ],
        "responses": {
          "201": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/200OK5"
            },
            "examples": {
              "application/json": {
                "success": true,
                "message": "Sign up successful",
                "data": {
                  "id": "ee21a7c8-71ba-4875-a36d-977f5a02023e",
                  "email": "myemail@domain.com",
                  "firstName": "Bobby",
                  "lastName": "Pascal",
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlMjFhN2M4LTcxYmEtNDg3NS1hMzZkLTk3N2Y1YTAyMDIzZSIsImVtYWlsIjoibXBwZGdyZWF0QGdtYWlsLmNvbSIsImlhdCI6MTYwMzgxNTY1MiwiZXhwIjoxNjA0MDc0ODUyfQ.pp1QYZ_kOYIGSk5F442btz5vN8_1K2mbLinWy48LLX0"
                }
              }
            },
            "headers": {}
          },
          "409": {
            "description": "Conflict",
            "schema": {
              "$ref": "#/definitions/404BADREQUEST"
            },
            "examples": {
              "application/json": {
                "success": false,
                "error": {
                  "message": "Email already exist"
                }
              }
            }
          }
        }
      }
    },
    "/auth/signin": {
      "post": {
        "summary": "login",
        "tags": [
          "auth"
        ],
        "operationId": "login",
        "deprecated": false,
        "produces": [
          "application/json"
        ],
        "parameters": [
          {
            "name": "Authorization",
            "in": "header",
            "required": false,
            "default": "Bearer {token}",
            "type": "string"
          },
          {
            "name": "Body",
            "in": "body",
            "required": true,
            "schema": {
              "$ref": "#/definitions/loginrequest"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "",
            "schema": {
              "$ref": "#/definitions/200OK5"
            },
            "examples": {
              "application/json": {
                "success": true,
                "message": "Login successful",
                "data": {
                  "id": "ee21a7c8-71ba-4875-a36d-977f5a02023e",
                  "email": "myemail@domain.com",
                  "firstName": "Bobby",
                  "lastName": "Pascal",
                  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlMjFhN2M4LTcxYmEtNDg3NS1hMzZkLTk3N2Y1YTAyMDIzZSIsImVtYWlsIjoibXBwZGdyZWF0QGdtYWlsLmNvbSIsImlhdCI6MTYwMzgxNjUyMSwiZXhwIjoxNjA0MDc1NzIxfQ.a7_u0BdeydaofiFIunw5A1nU_LKgzOTZKx3lKO7Iha4"
                }
              }
            },
            "headers": {}
          },
          "400": {
            "description": "Bad Request",
            "schema": {
              "$ref": "#/definitions/404BADREQUEST"
            },
            "examples": {
              "application/json": {
                "success": false,
                "error": {
                  "message": "Email or password not correct"
                }
              }
            }
          }
        }
      }
    }
  },
  "definitions": {
    "createtopicrequest": {
      "title": "createtopicrequest",
      "example": {
        "topicName": "Newsletter"
      },
      "type": "object",
      "properties": {
        "topicName": {
          "type": "string"
        }
      },
      "required": [
        "topicName"
      ]
    },
    "200OK": {
      "title": "200OK",
      "example": {
        "success": true,
        "data": {
          "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER"
        }
      },
      "type": "object",
      "properties": {
        "success": {
          "type": "boolean"
        },
        "data": {
          "$ref": "#/definitions/Data"
        }
      },
      "required": [
        "success",
        "data"
      ]
    },
    "Data": {
      "title": "Data",
      "example": {
        "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER"
      },
      "type": "object",
      "properties": {
        "topicArn": {
          "type": "string"
        }
      },
      "required": [
        "topicArn"
      ]
    },
    "Error": {
      "title": "Error",
      "example": {
        "message": "Authentication failed"
      },
      "type": "object",
      "properties": {
        "message": {
          "type": "string"
        }
      },
      "required": [
        "message"
      ]
    },
    "2000K": {
      "title": "2000K",
      "example": {
        "success": true,
        "data": [
          {
            "topicArn": "arn:aws:sns:us-east-1:89898989898:Default_CloudWatch_Alarms_Topic",
            "topicName": "Default_CloudWatch_Alarms_Topic"
          },
          {
            "topicArn": "arn:aws:sns:us-east-1:89898989898:Entertainment",
            "topicName": "Entertainment"
          },
          {
            "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER",
            "topicName": "NEWSLETTER"
          },
          {
            "topicArn": "arn:aws:sns:us-east-1:89898989898:SOFTWARE",
            "topicName": "SOFTWARE"
          }
        ]
      },
      "type": "object",
      "properties": {
        "success": {
          "type": "boolean"
        },
        "data": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Data1"
          }
        }
      },
      "required": [
        "success",
        "data"
      ]
    },
    "Data1": {
      "title": "Data1",
      "example": {
        "topicArn": "arn:aws:sns:us-east-1:89898989898:Default_CloudWatch_Alarms_Topic",
        "topicName": "Default_CloudWatch_Alarms_Topic"
      },
      "type": "object",
      "properties": {
        "topicArn": {
          "type": "string"
        },
        "topicName": {
          "type": "string"
        }
      },
      "required": [
        "topicArn",
        "topicName"
      ]
    },
    "subscriberequest": {
      "title": "subscriberequest",
      "example": {
        "topicName": "newsletter"
      },
      "type": "object",
      "properties": {
        "topicName": {
          "type": "string"
        }
      },
      "required": [
        "topicName"
      ]
    },
    "201CREATED": {
      "title": "201CREATED",
      "example": {
        "success": true,
        "message": "Check your email for 'AWS Notification' to confirm subscription. You may check 'SPAM' or 'JUNK' folder if not in inbox",
        "data": {
          "subscription": "pending confirmation"
        }
      },
      "type": "object",
      "properties": {
        "success": {
          "type": "boolean"
        },
        "message": {
          "type": "string"
        },
        "data": {
          "$ref": "#/definitions/Data2"
        }
      },
      "required": [
        "success",
        "message",
        "data"
      ]
    },
    "Data2": {
      "title": "Data2",
      "example": {
        "subscription": "pending confirmation"
      },
      "type": "object",
      "properties": {
        "subscription": {
          "type": "string"
        }
      },
      "required": [
        "subscription"
      ]
    },
    "unsubscriberequest": {
      "title": "unsubscriberequest",
      "example": {
        "topicName": "newsletter"
      },
      "type": "object",
      "properties": {
        "topicName": {
          "type": "string"
        }
      },
      "required": [
        "topicName"
      ]
    },
    "200OK1": {
      "title": "200OK1",
      "example": {
        "success": true,
        "message": "You have unsubscribed from 'NEWSLETTER'",
        "data": {}
      },
      "type": "object",
      "properties": {
        "success": {
          "type": "boolean"
        },
        "message": {
          "type": "string"
        },
        "data": {
          "type": "object"
        }
      },
      "required": [
        "success",
        "message",
        "data"
      ]
    },
    "publishrequest": {
      "title": "publishrequest",
      "example": {
        "topicName": "newsletter",
        "message": "This is to test the in app real time notification"
      },
      "type": "object",
      "properties": {
        "topicName": {
          "type": "string"
        },
        "message": {
          "type": "string"
        }
      },
      "required": [
        "topicName",
        "message"
      ]
    },
    "200OK2": {
      "title": "200OK2",
      "example": {
        "success": true,
        "message": "Message sent to 'NEWSLETTER' subscribers"
      },
      "type": "object",
      "properties": {
        "success": {
          "type": "boolean"
        },
        "message": {
          "type": "string"
        }
      },
      "required": [
        "success",
        "message"
      ]
    },
    "200OK3": {
      "title": "200OK3",
      "example": {
        "success": true,
        "message": "Success",
        "data": [
          {
            "id": "e1b8ee79-1688-41d9-83c1-85e8c191f7b2",
            "message": "This is a message to all subscribers",
            "topic": "NEWSLETTER",
            "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER",
            "senderId": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
            "createdAt": "2020-10-26T17:28:41.144Z",
            "updatedAt": "2020-10-26T17:28:41.144Z",
            "sender": {
              "id": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
              "firstName": "Bobby",
              "lastName": "Pascal",
              "email": "myemail@domain.com",
              "createdAt": "2020-10-26T00:21:31.619Z",
              "updatedAt": "2020-10-26T00:21:31.619Z"
            }
          },
          {
            "id": "3a67e4e5-8366-43a5-a8cd-e4772223d597",
            "message": "This is a message to all subscribers",
            "topic": "NEWSLETTER",
            "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER",
            "senderId": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
            "createdAt": "2020-10-26T17:30:35.837Z",
            "updatedAt": "2020-10-26T17:30:35.837Z",
            "sender": {
              "id": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
              "firstName": "Bobby",
              "lastName": "Pascal",
              "email": "myemail@domain.com",
              "createdAt": "2020-10-26T00:21:31.619Z",
              "updatedAt": "2020-10-26T00:21:31.619Z"
            }
          },
          {
            "id": "55829454-3f4a-4d7c-9de7-758692f4fb97",
            "message": "Another message to this subscriber",
            "topic": "NEWSLETTER",
            "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER",
            "senderId": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
            "createdAt": "2020-10-26T17:31:05.149Z",
            "updatedAt": "2020-10-26T17:31:05.149Z",
            "sender": {
              "id": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
              "firstName": "Bobby",
              "lastName": "Pascal",
              "email": "myemail@domain.com",
              "createdAt": "2020-10-26T00:21:31.619Z",
              "updatedAt": "2020-10-26T00:21:31.619Z"
            }
          }
        ]
      },
      "type": "object",
      "properties": {
        "success": {
          "type": "boolean"
        },
        "message": {
          "type": "string"
        },
        "data": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Data3"
          }
        }
      },
      "required": [
        "success",
        "message",
        "data"
      ]
    },
    "Data3": {
      "title": "Data3",
      "example": {
        "id": "e1b8ee79-1688-41d9-83c1-85e8c191f7b2",
        "message": "This is a message to all subscribers",
        "topic": "NEWSLETTER",
        "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER",
        "senderId": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
        "createdAt": "2020-10-26T17:28:41.144Z",
        "updatedAt": "2020-10-26T17:28:41.144Z",
        "sender": {
          "id": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
          "firstName": "Bobby",
          "lastName": "Pascal",
          "email": "myemail@domain.com",
          "createdAt": "2020-10-26T00:21:31.619Z",
          "updatedAt": "2020-10-26T00:21:31.619Z"
        }
      },
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "message": {
          "type": "string"
        },
        "topic": {
          "type": "string"
        },
        "topicArn": {
          "type": "string"
        },
        "senderId": {
          "type": "string"
        },
        "createdAt": {
          "type": "string"
        },
        "updatedAt": {
          "type": "string"
        },
        "sender": {
          "$ref": "#/definitions/Sender"
        }
      },
      "required": [
        "id",
        "message",
        "topic",
        "topicArn",
        "senderId",
        "createdAt",
        "updatedAt",
        "sender"
      ]
    },
    "Sender": {
      "title": "Sender",
      "example": {
        "id": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
        "firstName": "Bobby",
        "lastName": "Pascal",
        "email": "myemail@domain.com",
        "createdAt": "2020-10-26T00:21:31.619Z",
        "updatedAt": "2020-10-26T00:21:31.619Z"
      },
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "createdAt": {
          "type": "string"
        },
        "updatedAt": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "firstName",
        "lastName",
        "email",
        "createdAt",
        "updatedAt"
      ]
    },
    "200OK4": {
      "title": "200OK4",
      "example": {
        "success": true,
        "message": "Success",
        "data": [
          {
            "id": "0c8659e6-b692-4fc6-83a7-3174e8792976",
            "topic": "NEWSLETTER",
            "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER",
            "subscriberId": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
            "createdAt": "2020-10-26T17:28:12.3Z",
            "updatedAt": "2020-10-26T17:28:12.3Z"
          }
        ]
      },
      "type": "object",
      "properties": {
        "success": {
          "type": "boolean"
        },
        "message": {
          "type": "string"
        },
        "data": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Data4"
          }
        }
      },
      "required": [
        "success",
        "message",
        "data"
      ]
    },
    "Data4": {
      "title": "Data4",
      "example": {
        "id": "0c8659e6-b692-4fc6-83a7-3174e8792976",
        "topic": "NEWSLETTER",
        "topicArn": "arn:aws:sns:us-east-1:89898989898:NEWSLETTER",
        "subscriberId": "36a1490b-8d40-75102-9ccf-72bcf47fea82",
        "createdAt": "2020-10-26T17:28:12.3Z",
        "updatedAt": "2020-10-26T17:28:12.3Z"
      },
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "topic": {
          "type": "string"
        },
        "topicArn": {
          "type": "string"
        },
        "subscriberId": {
          "type": "string"
        },
        "createdAt": {
          "type": "string"
        },
        "updatedAt": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "topic",
        "topicArn",
        "subscriberId",
        "createdAt",
        "updatedAt"
      ]
    },
    "signuprequest": {
      "title": "signuprequest",
      "example": {
        "firstName": "Bobby",
        "lastName": "Pascal",
        "email": "myemail@domain.com",
        "password": "mypassword"
      },
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "password": {
          "type": "string"
        }
      },
      "required": [
        "firstName",
        "lastName",
        "email",
        "password"
      ]
    },
    "200OK5": {
      "title": "200OK5",
      "example": {
        "success": true,
        "message": "Sign up successful",
        "data": {
          "id": "ee21a7c8-71ba-4875-a36d-977f5a02023e",
          "email": "myemail@domain.com",
          "firstName": "Bobby",
          "lastName": "Pascal",
          "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlMjFhN2M4LTcxYmEtNDg3NS1hMzZkLTk3N2Y1YTAyMDIzZSIsImVtYWlsIjoibXBwZGdyZWF0QGdtYWlsLmNvbSIsImlhdCI6MTYwMzgxNTY1MiwiZXhwIjoxNjA0MDc0ODUyfQ.pp1QYZ_kOYIGSk5F442btz5vN8_1K2mbLinWy48LLX0"
        }
      },
      "type": "object",
      "properties": {
        "success": {
          "type": "boolean"
        },
        "message": {
          "type": "string"
        },
        "data": {
          "$ref": "#/definitions/Data5"
        }
      },
      "required": [
        "success",
        "message",
        "data"
      ]
    },
    "Data5": {
      "title": "Data5",
      "example": {
        "id": "ee21a7c8-71ba-4875-a36d-977f5a02023e",
        "email": "myemail@domain.com",
        "firstName": "Bobby",
        "lastName": "Pascal",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVlMjFhN2M4LTcxYmEtNDg3NS1hMzZkLTk3N2Y1YTAyMDIzZSIsImVtYWlsIjoibXBwZGdyZWF0QGdtYWlsLmNvbSIsImlhdCI6MTYwMzgxNTY1MiwiZXhwIjoxNjA0MDc0ODUyfQ.pp1QYZ_kOYIGSk5F442btz5vN8_1K2mbLinWy48LLX0"
      },
      "type": "object",
      "properties": {
        "id": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "firstName": {
          "type": "string"
        },
        "lastName": {
          "type": "string"
        },
        "token": {
          "type": "string"
        }
      },
      "required": [
        "id",
        "email",
        "firstName",
        "lastName",
        "token"
      ]
    },
    "loginrequest": {
      "title": "loginrequest",
      "example": {
        "email": "myemail@domain.com",
        "password": "mypassword"
      },
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "password": {
          "type": "string"
        }
      },
      "required": [
        "email",
        "password"
      ]
    },
    "404BADREQUEST": {
      "title": "404BADREQUEST",
      "example": {
        "success": false,
        "error": {
          "message": "Email or password not correct"
        }
      },
      "type": "object",
      "properties": {
        "success": {
          "type": "boolean"
        },
        "error": {
          "$ref": "#/definitions/Error"
        }
      },
      "required": [
        "success",
        "error"
      ]
    }
  },
  "tags": [
    {
      "name": "notifications"
    },
    {
      "name": "auth"
    }
  ]
}