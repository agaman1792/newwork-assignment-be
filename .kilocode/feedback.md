# Feedback

Endpoints:

POST /employee-profiles/:id/feedback

Roles: co-worker, manager, admin

Body: { text: string, polish: boolean }

Calls HuggingFace model if requested.

GET /employee-profiles/:id/feedback

Anyone with profile access (co-worker or above)
