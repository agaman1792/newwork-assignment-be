# Full Implementation Plan

This document outlines the detailed steps required to complete the project based on the initial analysis.

## 1. Implement `AbsenceRequest` Module

### 1.1. Create `absence-requests.module.ts`
- **File Path:** `src/absence-requests/absence-requests.module.ts`
- **Description:** This module will encapsulate all components related to absence request management.
- **Imports:** `TypeOrmModule.forFeature([AbsenceRequest, Employee, User])`, `AuthModule`
- **Providers:** `AbsenceRequestsService`
- **Controllers:** `AbsenceRequestsController`

### 1.2. Create `absence-requests.service.ts`
- **File Path:** `src/absence-requests/absence-requests.service.ts`
- **Description:** This service will handle all business logic for absence requests, including creating, retrieving, and updating requests.
- **Dependencies:** `AbsenceRequestRepository`, `EmployeeRepository`, `UserRepository`
- **Methods:**
    - `create(createDto, user)`: Creates a new absence request.
    - `findAllForProfile(profileId, user)`: Retrieves all absence requests for a specific profile, filtering by user role.
    - `approve(id, user)`: Approves an absence request.
    - `reject(id, user)`: Rejects an absence request.
    - `cancel(id, user)`: Cancels an absence request.

### 1.3. Create `absence-requests.controller.ts`
- **File Path:** `src/absence-requests/absence-requests.controller.ts`
- **Description:** This controller will define the API endpoints for managing absence requests.
- **Endpoints:**
    - `POST /profiles/:id/absence-requests`: Create a new absence request.
    - `GET /profiles/:id/absence-requests`: List absence requests for a profile.
    - `PUT /absence-requests/:id/approve`: Approve an absence request.
    - `PUT /absence-requests/:id/reject`: Reject an absence request.
    - `PUT /absence-requests/:id/cancel`: Cancel an absence request.

### 1.4. Create DTOs for `AbsenceRequest`
- **File Path:** `src/absence-requests/dto/create-absence-request.dto.ts`
- **Description:** Define the data transfer object for creating an absence request.
- **Fields:** `startDate`, `endDate`, `reason`

## 2. Implement `Audit` Module

### 2.1. Create `audit.module.ts`
- **File Path:** `src/audit/audit.module.ts`
- **Description:** This module will provide a service for logging audit trails.
- **Imports:** `TypeOrmModule.forFeature([Audit, User])`
- **Providers:** `AuditService`
- **Exports:** `AuditService`

### 2.2. Create `audit.service.ts`
- **File Path:** `src/audit/audit.service.ts`
- **Description:** This service will provide a method to log actions performed by users.
- **Dependencies:** `AuditRepository`
- **Methods:**
    - `log(userId, action, entity, entityId, details)`: Creates a new audit log entry.

## 3. Integrate New Modules

### 3.1. Update `app.module.ts`
- **File Path:** `src/app.module.ts`
- **Action:** Import `AbsenceRequestsModule` and `AuditModule` into the `imports` array of the `AppModule`.

## 4. Verify and Complete `Feedback` and `Employee Profile` Endpoints

### 4.1. Review `feedback.controller.ts` and `feedback.service.ts`
- **Action:** Read and analyze the existing feedback implementation to ensure it meets all requirements from `feedback.md`, including the AI polishing feature.

### 4.2. Review `employees.controller.ts` and `employees.service.ts`
- **Action:** Read and analyze the existing employee profile implementation to ensure it meets all requirements from `employee-profile.md`, including role-based access control for sensitive fields.

## 5. Code Review and Refactoring

### 5.1. Final Review
- **Action:** Perform a final review of the entire codebase to ensure consistency, correctness, and adherence to the project's coding standards.

---

This plan will be executed by switching to the **Code** mode.
