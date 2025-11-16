# Employee profile

All employee profiles are represented as the `Employee` entity (refer to `data-model.md` for more information)

## Access rules
| Role                       | View Full Profile | Edit Profile | View Non-sensitive Profile |
| ---------------------------| ----------------- | ------------ | -------------------------- |
| Admin                      | Yes               | Yes          | Yes                        |
| Manager                    | Yes               | Yes          | Yes                        |
| Employee (self)            | Yes               | Yes          | Yes                        |
| Employee (Co-worker)       | No                | No           | Yes                        |

## Non-sensitive fields

id
first_name
last_name
position
department
bio
skills
image_url



## Employee profile endpoints

All authentication endpoints will have the `/profiles` prefix
The following endpoints will be implemented
For each endpoint that contains a request body, create a DTO

#### Create an employee profile
* Request method: POST
* Request path: /profiles
* Request headers:
    * Authorization
        * Contains the user bearer token
* Response body:
    * id, the user id which this employee profile will be linked to
* Errors
    * 404 if user not found
    * 401 if unauthenticated

Only managers or admins can call this endpoint

#### Read a profile
* Request method: GET
* Request path: /profiles/:id
* Request headers:
    * Authorization
        * Contains the user bearer token
* Response body:
    * the employee data fetched by the id path parameter
* Errors
    * 404 if profile not found
    * 401 if unauthenticated

#### Update profile
* Request method: PATCH
* Request path: /profiles/:id
* Request headers:
    * Authorization
        * Contains the user bearer token
* Request body:
    * partial employee profile data (except id)
* Response body:
    * 204 no content on success
* Errors
    * 403 if not authorized
    * 404 if not found


Authorization rules:
* Allowed if owner OR has MANAGER or ADMIN role

Actions:
* Update allowed fields
* sensitive fields (salary/ssn) included but editable only by owner/manager/admin (rule satisfied above)

#### List feedback associated with a profile

* Request method: GET
* Request path: /profiles/:id/feedback
* Request headers:
    * Authorization
        * Contains the user bearer token
* Response body:
    * the list of feedback entities associated with this id
* Errors
    * 403 if not authorized
    * 404 if not found

Visible to all authenticated users; content shows text_polished or text_original depending on availability and policy
Pagination params optional: ?limit=&offset=
