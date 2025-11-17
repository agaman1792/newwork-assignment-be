# Feedback

Endpoints:

POST /profiles/:id/feedback

Roles: co-worker, manager, admin

Body: { text: string, polish: boolean }

Calls HuggingFace model if requested.

GET /profiles/:id/feedback

Anyone with profile access (co-worker or above)
