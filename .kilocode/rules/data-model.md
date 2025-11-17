# Data model

We are using SQLite as storage

TypeORM will be instantiated in the main app module
* The database path will be supplied as an environment variable, SQLITE_DB_PATH

We use TypeORM in order to define our database entities
* The database entities will be stored in their own domain directory, for instance
    * If we have an entity called `Employee` (a single word)
        * It will be placed inside the `src/employees` directory
        * The file name will be `employee.entity.ts`
        * The database table name will be `Employees`
    * If we have an entity called `ShoppingCart` (multiple words)
        * It will be placed inside the `src/shopping-carts` directory
        * The file name will be `shopping-cart.entity.ts`
        * The database table will be `ShoppingCarts`

The following entities are part of the application

## Employee
| Field      | Type     | Info                              |
| ---------- | -------- | --------------------------------- |
| id         | TEXT     | Primary key (UUID)                |
| email         | TEXT     | Unique                                                 |
| password_hash | TEXT     | Hashed password                                        |
| roles         | TEXT     | Comma-separated roles (`EMPLOYEE`, `MANAGER`, `ADMIN`) |
| is_active     | INTEGER  | Boolean (0/1)                                          |
| first_name | TEXT     |                                   |
| last_name  | TEXT     |                                   |
| position   | TEXT     |                                   |
| department | TEXT     |                                   |
| phone      | TEXT     |                                   |
| location   | TEXT     |                                   |
| hire_date  | DATETIME |                                   |
| birth_date | DATETIME |                                   |
| salary     | REAL     | Sensitive / hidden for co-workers |
| ssn        | TEXT     | Sensitive / hidden for co-workers |
| bio        | TEXT     |                                   |
| skills     | TEXT     | Comma-separated                   |
| image_url  | TEXT     |                                   |
| created_at | DATETIME |                                   |
| updated_at | DATETIME |                                   |

## Feedback
| Field         | Type     | Info                      |
| ------------- | -------- | ------------------------- |
| id            | TEXT     | Primary key               |
| employee_id    | TEXT     | FK → employee.id |
| author_id     | TEXT     | FK → users.id             |
| text_original | TEXT     | Original text             |
| text_polished | TEXT     | Polished by AI (optional) |
| is_polished   | INTEGER  | Boolean (0/1)             |
| created_at    | DATETIME |                           |

## AbsenceRequest
| Field       | Type     | Info                                           |
| ----------- | -------- | ---------------------------------------------- |
| id          | TEXT     | Primary key                                    |
| employee_id  | TEXT     | FK → employee.id                      |
| approver_id | TEXT     | FK → employee.id, nullable                        |
| start_date  | DATETIME |                                                |
| end_date    | DATETIME |                                                |
| reason      | TEXT     |                                                |
| status      | TEXT     | `PENDING`, `APPROVED`, `REJECTED`, `CANCELLED` |
| created_at  | DATETIME |                                                |
| updated_at  | DATETIME |                                                |

## Audit
| Field      | Type     | Info                  |
| ---------- | -------- | --------------------- |
| id         | TEXT     | Primary key           |
| employee_id    | TEXT     | FK → employee.id         |
| action     | TEXT     | Action description    |
| entity     | TEXT     | Entity name           |
| entity_id  | TEXT     | ID of affected record |
| details    | TEXT     | JSON or text          |
| created_at | DATETIME |                       |
