# Implementation Plan

## Epic: Backend API Setup

### Task: Configure Database and ORM
*   **Title:** As a developer, I can connect to the SQLite database using TypeORM.
*   **Description:** Configure the main application module to instantiate TypeORM and connect to the SQLite database. The database path will be provided via the `SQLITE_DB_PATH` environment variable.
*   **Acceptance Criteria:**
    *   The application successfully connects to the SQLite database on startup.
    *   TypeORM is configured to manage database entities.
*   **Technical Notes:**
    *   Use the `@nestjs/typeorm` and `sqlite3` packages.
    *   The configuration should be placed in `src/app.module.ts`.

### Task: Implement Core Authentication Module
*   **Title:** As a developer, I can set up the core authentication module.
*   **Description:** Create the `auth.module.ts` which will encapsulate all authentication-related components like controllers, services, and JWT strategy.
*   **Acceptance Criteria:**
    *   The `AuthModule` is created in `src/authz/auth.module.ts`.
    *   The module imports and exports the necessary services and controllers.
*   **Technical Notes:**
    *   Use NestJS modules to organize the authentication feature.

## Epic: Database Schema

### Task: Create User Entity
*   **Title:** As a developer, I can define the `User` entity.
*   **Description:** Create the TypeORM entity for the `User` model as specified in `data-model.md`.
*   **Acceptance Criteria:**
    *   The `User` entity is created at `src/authz/users/user.entity.ts`.
    *   All fields from the data model are correctly mapped to the entity.
*   **Technical Notes:**
    *   Use TypeORM decorators to define columns, relationships, and constraints.

### Task: Create Employee Entity
*   **Title:** As a developer, I can define the `Employee` entity.
*   **Description:** Create the TypeORM entity for the `Employee` model.
*   **Acceptance Criteria:**
    *   The `Employee` entity is created at `src/employees/employee.entity.ts`.
    *   All fields from the data model are correctly mapped.
*   **Technical Notes:**
    *   Establish a one-to-one relationship with the `User` entity.

### Task: Create Feedback Entity
*   **Title:** As a developer, I can define the `Feedback` entity.
*   **Description:** Create the TypeORM entity for the `Feedback` model.
*   **Acceptance Criteria:**
    *   The `Feedback` entity is created at `src/feedback/feedback.entity.ts`.
    *   All fields from the data model are correctly mapped.
*   **Technical Notes:**
    *   Establish relationships with `Employee` and `User` entities.

### Task: Create AbsenceRequest Entity
*   **Title:** As a developer, I can define the `AbsenceRequest` entity.
*   **Description:** Create the TypeORM entity for the `AbsenceRequest` model.
*   **Acceptance Criteria:**
    *   The `AbsenceRequest` entity is created at `src/absence-requests/absence-request.entity.ts`.
    *   All fields from the data model are correctly mapped.
*   **Technical Notes:**
    *   Establish relationships with `Employee` and `User` entities.

### Task: Create Audit Entity
*   **Title:** As a developer, I can define the `Audit` entity.
*   **Description:** Create the TypeORM entity for the `Audit` model.
*   **Acceptance Criteria:**
    *   The `Audit` entity is created at `src/audit/audit.entity.ts`.
    *   All fields from the data model are correctly mapped.
*   **Technical Notes:**
    *   Establish a relationship with the `User` entity.

## Epic: User Authentication

### Task: Implement User Registration
*   **Title:** As a user, I can register a new account.
*   **Description:** Implement the `POST /auth/users` endpoint to allow new users to register.
*   **Acceptance Criteria:**
    *   The endpoint accepts an email, password, and roles.
    *   The password is securely hashed before being stored.
    *   A new user is created in the database.
    *   The endpoint returns a 204 No Content on success.
*   **Technical Notes:**
    *   Use `bcrypt` for password hashing.
    *   Create a `RegisterUserDto` for request body validation.

### Task: Implement User Login
*   **Title:** As a user, I can log in to the application.
*   **Description:** Implement the `POST /auth/login` endpoint to authenticate users.
*   **Acceptance Criteria:**
    *   The endpoint accepts an email and password.
    *   It returns a JWT if the credentials are valid.
    *   The JWT payload contains `sub`, `email`, and `roles`.
*   **Technical Notes:**
    *   Use the `@nestjs/jwt` package for JWT generation and verification.
    *   Create a `LoginDto` for request body validation.

### Task: Implement Change Password
*   **Title:** As an authenticated user, I can change my password.
*   **Description:** Implement the `POST /auth/password/change` endpoint.
*   **Acceptance Criteria:**
    *   The endpoint is protected and requires a valid JWT.
    *   It accepts the old and new passwords.
    *   The user's password hash is updated in the database.
    *   Returns 204 No Content on success.
*   **Technical Notes:**
    *   Create a `ChangePasswordDto`.
    *   Verify the old password before updating.

### Task: Implement Reset Password
*   **Title:** As an administrator, I can reset a user's password.
*   **Description:** Implement the `POST /auth/password/reset` endpoint.
*   **Acceptance Criteria:**
    *   Only users with the `ADMINISTRATOR` role can access this endpoint.
    *   A new 12-character password is generated and updated for the specified user.
    *   The new password is returned in the response.
*   **Technical Notes:**
    *   Create a `ResetPasswordDto`.
    *   Implement role-based access control using a guard.

### Task: Implement Get User Profile
*   **Title:** As an authenticated user, I can retrieve my profile information.
*   **Description:** Implement the `GET /auth/profile` endpoint.
*   **Acceptance Criteria:**
    *   The endpoint is protected and requires a valid JWT.
    *   It returns the full user data (except `password_hash`) based on the `sub` claim in the JWT.
*   **Technical Notes:**
    *   Use a JWT strategy to extract user information from the token.

## Epic: Employee Profile Management

### Task: Implement Create Employee Profile
*   **Title:** As a manager or admin, I can create an employee profile.
*   **Description:** Implement the `POST /profiles` endpoint.
*   **Acceptance Criteria:**
    *   Only users with `MANAGER` or `ADMIN` roles can create profiles.
    *   The endpoint links the profile to an existing user.
    *   Returns the user ID on success.
    *   Returns 404 if the user is not found.
*   **Technical Notes:**
    *   Create a `CreateEmployeeProfileDto`.
    *   Implement role-based access control.

### Task: Implement Read Employee Profile
*   **Title:** As an authenticated user, I can view an employee profile.
*   **Description:** Implement the `GET /profiles/:id` endpoint.
*   **Acceptance Criteria:**
    *   Admins, managers, and the profile owner can view all fields.
    *   Co-workers can only view non-sensitive fields.
    *   Returns 404 if the profile is not found.
*   **Technical Notes:**
    *   Implement logic to conditionally expose sensitive fields based on the user's role and relationship to the profile.

### Task: Implement Update Employee Profile
*   **Title:** As an authorized user, I can update an employee profile.
*   **Description:** Implement the `PATCH /profiles/:id` endpoint.
*   **Acceptance Criteria:**
    *   The profile owner, managers, and admins can update the profile.
    *   Returns 204 No Content on success.
    *   Returns 403 if the user is not authorized.
*   **Technical Notes:**
    *   Create an `UpdateEmployeeProfileDto` with all fields optional.
    *   Implement authorization logic in the service or a guard.

## Epic: Feedback Management

### Task: Implement Create Feedback
*   **Title:** As an authorized user, I can provide feedback on an employee profile.
*   **Description:** Implement the `POST /profiles/:id/feedback` endpoint.
*   **Acceptance Criteria:**
    *   Co-workers, managers, and admins can submit feedback.
    *   The endpoint accepts `text` and an optional `polish` boolean.
    *   If `polish` is true, it calls a HuggingFace model to polish the text.
*   **Technical Notes:**
    *   Create a `CreateFeedbackDto`.
    *   Use an HTTP client like `axios` to interact with the HuggingFace API.

### Task: Implement List Feedback
*   **Title:** As an authorized user, I can view feedback for an employee profile.
*   **Description:** Implement the `GET /profiles/:id/feedback` endpoint.
*   **Acceptance Criteria:**
    *   Any user with access to the profile can view feedback.
    *   Supports optional `limit` and `offset` pagination parameters.
*   **Technical Notes:**
    *   Implement pagination logic in the service layer.

## Epic: Absence Request Management

### Task: Implement Create Absence Request
*   **Title:** As an employee, I can request an absence.
*   **Description:** Implement the `POST /profiles/:id/absence-requests` endpoint.
*   **Acceptance Criteria:**
    *   The profile owner, managers, and admins can create an absence request.
    *   The initial status of the request is `PENDING`.
*   **Technical Notes:**
    *   Create a `CreateAbsenceRequestDto`.

### Task: Implement List Absence Requests
*   **Title:** As an authorized user, I can view absence requests.
*   **Description:** Implement the `GET /profiles/:id/absence-requests` endpoint.
*   **Acceptance Criteria:**
    *   Employees can only see their own requests.
    *   Managers and admins can see all requests for a given profile.
*   **Technical Notes:**
    *   Implement authorization logic based on user roles.

### Task: Implement Approve Absence Request
*   **Title:** As a manager or admin, I can approve an absence request.
*   **Description:** Implement the `PUT /absence-requests/:id/approve` endpoint.
*   **Acceptance Criteria:**
    *   Only managers and admins can approve requests.
    *   The request status is updated to `APPROVED`.
*   **Technical Notes:**
    *   Implement role-based access control.

### Task: Implement Reject Absence Request
*   **Title:** As a manager or admin, I can reject an absence request.
*   **Description:** Implement the `PUT /absence-requests/:id/reject` endpoint.
*   **Acceptance Criteria:**
    *   Only managers and admins can reject requests.
    *   The request status is updated to `REJECTED`.
*   **Technical Notes:**
    *   Implement role-based access control.

### Task: Implement Cancel Absence Request
*   **Title:** As an employee, I can cancel my approved absence request.
*   **Description:** Implement the `PUT /absence-requests/:id/cancel` endpoint.
*   **Acceptance Criteria:**
    *   Only the employee who created the request can cancel it.
    *   The request must be in the `APPROVED` state to be cancelled.
    *   The request status is updated to `CANCELLED`.
*   **Technical Notes:**
    *   Implement ownership-based authorization.
