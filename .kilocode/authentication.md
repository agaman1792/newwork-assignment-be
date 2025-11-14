# Authentication

All authentication related code will reside in the `src/authz` directory

All users of this application are represented as the `User` entity (refer to `data-model.md` for more information)

## High-level concerns

We will have an authentication controller, `auth.controller.ts` which handles the following concerns
* Define the routes and delegate calls to the authentication service
* Handles high-level authorization for specific endpoints
* Validates the request payload
* Delegates the request to the authentication service

We will have an authentication service, `auth.service.ts` which handles the following concerns
* Database access and data mapping
* Handles all the logic, the controller will delegate all calls to the authentication service

The authentication service and the authentication controller will be packaged inside the authentication module `auth.module.ts`

## User roles

Each `User` can have one of the following roles
* ADMINISTRATOR
* MANAGER
* EMPLOYEE

## Password hashing

In order to authenticate a user, we will search the `Users` table for a matching e-mail and compare the password hash
The password hash is set in the following cases
* When a user is registered
* When the password is changed
* When the password is reset

Use a strong hashing algorithm for the password

## Using JWT

Once authenticated, the server will issue a JWT containing
* sub
    * The database user id, as string
* email
    * The database user email, as string
* roles
    * Comma separated list of roles, picked up from the roles database entity, as string

The authentication functionality will be architected as following

## Authentication endpoints

All authentication endpoints will have the `/auth` prefix
The following endpoints will be implemented
For each endpoint that contains a request body, create a DTO

#### Login
* Request method: POST
* Request path: /login
* Request body:
    * e-mail
    * password
* Response body:
    * token

The password will be received in plain in the request body
Search a user in the `Users` table with the respective e-mail
Hash the password received in the request body and compare it with the database `password_hash`

#### Register user
* Request method: POST
* Request path: /users
* Request body:
    * e-mail
    * password
    * roles
* Response: 204 no content on success

#### Change password
* Request method: POST
* Request path: /password/change
* Request headers:
    * Authorization
        * Contains the user bearer token
* Request body:
    * oldPassword
    * newPassword
* Response: 204 no content on success

#### Reset password
* Request method: POST
* Request path: /password/reset
* Request headers:
    * Authorization
        * Contains the user bearer token
* Request body:
    * e-mail
        * The e-mail of the user which will have its password changed
* Response body
    * password (the password that was generated)

Reset password can only be performed by an administrator
Decode the token received in the authorization header and verify that the `ADMINISTRATOR` role is present
A new 12 characters password will be generated for the user

#### Get user profile
* Request method: GET
* Request path: /profile
* Request headers:
    * Authorization
    * Contains the user bearer token
* Response body
    * The full user data from the database. The data will be picked up from the users table, based on the sub

Decode the token received in the authorization header and use the `sub` property in order to look up the user in the database
Return the found user data, without the `password_hash` property
