# Project

This project will support the backend logic to support the following use-case:

Employee Profile (HR Application):

* As a manager or the employee who owns the profile:
    * I can see all data
    * I can change all data
* As a co-worker:
    * I can see non-sensitive data
    * I can leave feedback (which is optionally polished using an AI service – use any free HuggingFace model)
* As an employee:
    * I can request an absence

## Co-worker Definition

A user is considered a co-worker of an employee profile if:
- The user has the EMPLOYEE role
- The user does NOT have the MANAGER role
- The user does NOT have the ADMIN role
- The user is NOT the owner of the target profile
