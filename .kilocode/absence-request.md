# Absence request

Endpoints:

POST /profiles/:id/absence-requests

Roles: employee (self), manager, admin

Creates a PENDING request.

GET /profiles/:id/absence-requests

Self: see own

Manager/admin: see all

PUT /absence-requests/:id/approve

Manager/admin

PUT /absence-requests/:id/reject

Manager/admin

PUT /absence-requests/:id/cancel

Self only (if APPROVED)
