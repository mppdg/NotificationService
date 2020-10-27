declare const _default: {
    swagger: string;
    info: {
        version: string;
        title: string;
        contact: {};
    };
    host: string;
    basePath: string;
    securityDefinitions: {
        Bearer: {
            type: string;
            name: string;
            in: string;
            default: string;
        };
    };
    schemes: string[];
    consumes: string[];
    produces: string[];
    paths: {
        "/notifications/topics": {
            post: {
                summary: string;
                tags: string[];
                operationId: string;
                deprecated: boolean;
                produces: string[];
                parameters: ({
                    name: string;
                    in: string;
                    required: boolean;
                    default: string;
                    type: string;
                    schema?: undefined;
                } | {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                    default?: undefined;
                    type?: undefined;
                })[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            "application/json": {
                                success: boolean;
                                data: {
                                    topicArn: string;
                                };
                            };
                        };
                        headers: {};
                    };
                };
            };
            get: {
                summary: string;
                tags: string[];
                operationId: string;
                deprecated: boolean;
                produces: string[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    default: string;
                    type: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            "application/json": {
                                success: boolean;
                                data: {
                                    topicArn: string;
                                    topicName: string;
                                }[];
                            };
                        };
                        headers: {};
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            "application/json": {
                                success: boolean;
                                error: {
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/notifications/subscribe": {
            post: {
                summary: string;
                tags: string[];
                operationId: string;
                deprecated: boolean;
                produces: string[];
                parameters: ({
                    name: string;
                    in: string;
                    required: boolean;
                    default: string;
                    type: string;
                    schema?: undefined;
                } | {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                    default?: undefined;
                    type?: undefined;
                })[];
                responses: {
                    "201": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            "application/json": {
                                success: boolean;
                                message: string;
                                data: {
                                    subscription: string;
                                };
                            };
                        };
                        headers: {};
                    };
                    "409": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            "application/json": {
                                success: boolean;
                                error: {
                                    message: string;
                                };
                            };
                        };
                    };
                    "500": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            "application/json": {
                                success: boolean;
                                error: {
                                    message: string;
                                };
                            };
                        };
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            "application/json": {
                                success: boolean;
                                error: {
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/notifications/publish": {
            post: {
                summary: string;
                tags: string[];
                operationId: string;
                deprecated: boolean;
                produces: string[];
                parameters: ({
                    name: string;
                    in: string;
                    required: boolean;
                    default: string;
                    type: string;
                    schema?: undefined;
                } | {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                    default?: undefined;
                    type?: undefined;
                })[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            "application/json": {
                                success: boolean;
                                message: string;
                            };
                        };
                        headers: {};
                    };
                    "404": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            "application/json": {
                                success: boolean;
                                error: {
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/notifications": {
            get: {
                summary: string;
                tags: string[];
                operationId: string;
                deprecated: boolean;
                produces: string[];
                parameters: {
                    name: string;
                    in: string;
                    required: boolean;
                    default: string;
                    type: string;
                }[];
                responses: {
                    "200": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            "application/json": {
                                success: boolean;
                                message: string;
                                data: {
                                    id: string;
                                    message: string;
                                    topic: string;
                                    topicArn: string;
                                    senderId: string;
                                    createdAt: string;
                                    updatedAt: string;
                                    sender: {
                                        id: string;
                                        firstName: string;
                                        lastName: string;
                                        email: string;
                                        createdAt: string;
                                        updatedAt: string;
                                    };
                                }[];
                            };
                        };
                        headers: {};
                    };
                    "401": {
                        description: string;
                        schema: {
                            $ref: string;
                        };
                        examples: {
                            "application/json": {
                                success: boolean;
                                error: {
                                    message: string;
                                };
                            };
                        };
                    };
                };
            };
        };
        "/auth/signup": {
            post: {
                summary: string;
                tags: string[];
                operationId: string;
                deprecated: boolean;
                produces: string[];
                parameters: ({
                    name: string;
                    in: string;
                    required: boolean;
                    default: string;
                    type: string;
                    schema?: undefined;
                } | {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                    default?: undefined;
                    type?: undefined;
                })[];
                responses: {
                    "200": {
                        description: string;
                        headers: {};
                    };
                };
            };
        };
        "/auth/signin": {
            post: {
                summary: string;
                tags: string[];
                operationId: string;
                deprecated: boolean;
                produces: string[];
                parameters: ({
                    name: string;
                    in: string;
                    required: boolean;
                    default: string;
                    type: string;
                    schema?: undefined;
                } | {
                    name: string;
                    in: string;
                    required: boolean;
                    schema: {
                        $ref: string;
                    };
                    default?: undefined;
                    type?: undefined;
                })[];
                responses: {
                    "200": {
                        description: string;
                        headers: {};
                    };
                };
            };
        };
    };
    definitions: {
        createtopicrequest: {
            title: string;
            example: {
                topicName: string;
            };
            type: string;
            properties: {
                topicName: {
                    type: string;
                };
            };
            required: string[];
        };
        Error: {
            title: string;
            example: {
                message: string;
            };
            type: string;
            properties: {
                message: {
                    type: string;
                };
            };
            required: string[];
        };
        "2000K": {
            title: string;
            example: {
                success: boolean;
                data: {
                    topicArn: string;
                    topicName: string;
                }[];
            };
            type: string;
            properties: {
                success: {
                    type: string;
                };
                data: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            required: string[];
        };
        Datum: {
            title: string;
            example: {
                topicArn: string;
                topicName: string;
            };
            type: string;
            properties: {
                topicArn: {
                    type: string;
                };
                topicName: {
                    type: string;
                };
            };
            required: string[];
        };
        subscriberequest: {
            title: string;
            example: {
                topicName: string;
            };
            type: string;
            properties: {
                topicName: {
                    type: string;
                };
            };
            required: string[];
        };
        "201CREATED": {
            title: string;
            example: {
                success: boolean;
                message: string;
                data: {
                    subscription: string;
                };
            };
            type: string;
            properties: {
                success: {
                    type: string;
                };
                message: {
                    type: string;
                };
                data: {
                    $ref: string;
                };
            };
            required: string[];
        };
        Data: {
            title: string;
            example: {
                subscription: string;
            };
            type: string;
            properties: {
                subscription: {
                    type: string;
                };
            };
            required: string[];
        };
        unsubscriberequest: {
            title: string;
            example: {
                topicName: string;
            };
            type: string;
            properties: {
                topicName: {
                    type: string;
                };
            };
            required: string[];
        };
        "200OK": {
            title: string;
            example: {
                success: boolean;
                message: string;
                data: {};
            };
            type: string;
            properties: {
                success: {
                    type: string;
                };
                message: {
                    type: string;
                };
                data: {
                    type: string;
                };
            };
            required: string[];
        };
        publishrequest: {
            title: string;
            example: {
                topicName: string;
                message: string;
            };
            type: string;
            properties: {
                topicName: {
                    type: string;
                };
                message: {
                    type: string;
                };
            };
            required: string[];
        };
        "200OK1": {
            title: string;
            example: {
                success: boolean;
                message: string;
            };
            type: string;
            properties: {
                success: {
                    type: string;
                };
                message: {
                    type: string;
                };
            };
            required: string[];
        };
        "401UNAUTHENTICATION": {
            title: string;
            example: {
                success: boolean;
                error: {
                    message: string;
                };
            };
            type: string;
            properties: {
                success: {
                    type: string;
                };
                error: {
                    $ref: string;
                };
            };
            required: string[];
        };
        "200OK2": {
            title: string;
            example: {
                success: boolean;
                message: string;
                data: {
                    id: string;
                    message: string;
                    topic: string;
                    topicArn: string;
                    senderId: string;
                    createdAt: string;
                    updatedAt: string;
                    sender: {
                        id: string;
                        firstName: string;
                        lastName: string;
                        email: string;
                        createdAt: string;
                        updatedAt: string;
                    };
                }[];
            };
            type: string;
            properties: {
                success: {
                    type: string;
                };
                message: {
                    type: string;
                };
                data: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            required: string[];
        };
        Data1: {
            title: string;
            example: {
                id: string;
                message: string;
                topic: string;
                topicArn: string;
                senderId: string;
                createdAt: string;
                updatedAt: string;
                sender: {
                    id: string;
                    firstName: string;
                    lastName: string;
                    email: string;
                    createdAt: string;
                    updatedAt: string;
                };
            };
            type: string;
            properties: {
                id: {
                    type: string;
                };
                message: {
                    type: string;
                };
                topic: {
                    type: string;
                };
                topicArn: {
                    type: string;
                };
                senderId: {
                    type: string;
                };
                createdAt: {
                    type: string;
                };
                updatedAt: {
                    type: string;
                };
                sender: {
                    $ref: string;
                };
            };
            required: string[];
        };
        Sender: {
            title: string;
            example: {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
                createdAt: string;
                updatedAt: string;
            };
            type: string;
            properties: {
                id: {
                    type: string;
                };
                firstName: {
                    type: string;
                };
                lastName: {
                    type: string;
                };
                email: {
                    type: string;
                };
                createdAt: {
                    type: string;
                };
                updatedAt: {
                    type: string;
                };
            };
            required: string[];
        };
        "200OK3": {
            title: string;
            example: {
                success: boolean;
                message: string;
                data: {
                    id: string;
                    topic: string;
                    topicArn: string;
                    subscriberId: string;
                    createdAt: string;
                    updatedAt: string;
                }[];
            };
            type: string;
            properties: {
                success: {
                    type: string;
                };
                message: {
                    type: string;
                };
                data: {
                    type: string;
                    items: {
                        $ref: string;
                    };
                };
            };
            required: string[];
        };
        Data2: {
            title: string;
            example: {
                id: string;
                topic: string;
                topicArn: string;
                subscriberId: string;
                createdAt: string;
                updatedAt: string;
            };
            type: string;
            properties: {
                id: {
                    type: string;
                };
                topic: {
                    type: string;
                };
                topicArn: {
                    type: string;
                };
                subscriberId: {
                    type: string;
                };
                createdAt: {
                    type: string;
                };
                updatedAt: {
                    type: string;
                };
            };
            required: string[];
        };
        signuprequest: {
            title: string;
            example: {
                firstName: string;
                lastName: string;
                email: string;
                password: string;
            };
            type: string;
            properties: {
                firstName: {
                    type: string;
                };
                lastName: {
                    type: string;
                };
                email: {
                    type: string;
                };
                password: {
                    type: string;
                };
            };
            required: string[];
        };
        loginrequest: {
            title: string;
            example: {
                firstName: string;
                lastName: string;
                email: string;
                password: string;
            };
            type: string;
            properties: {
                firstName: {
                    type: string;
                };
                lastName: {
                    type: string;
                };
                email: {
                    type: string;
                };
                password: {
                    type: string;
                };
            };
            required: string[];
        };
    };
    tags: {
        name: string;
    }[];
};
export default _default;
