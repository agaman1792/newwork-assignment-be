# Data model

We are using SQLite as storage

We use TypeORM in order to define our database entities
* The database entities will be stored in the src/entities directory
* Each entity will be stored in its own file
* If we have an entity called User, then the file will be found at src/entities/user.entity.ts

We will create a module containing all the entities, at the following location: src/entities/entities.module.ts
This module will be included in the main application module

The following entities are part of the application

### User
* id - INTEGER, NOT NULL, AUTO INCREMENT, UNIQUE
* email - TEXT, NOT NULL, UNIQUE
* name - TEXT, NOT NULL
* roles - TEXT
* createdAt - TEXT, NOT NULL
* updatedAt - TEXT, NOT NULL

### Employee
* id - INTEGER, NOT NULL, AUTO INCREMENT, UNIQUE
* userId - INTEGER, NOT NULL, UNIQUE
* jobTitle - TEXT, NOT NULL
* department - TEXT, NOT NULL
* phone - TEXT, NOT NULL
* address - TEXT, NOT NULL
* ssn - TEXT, NOT NULL
* salary - NUMERIC, NOT NULL

