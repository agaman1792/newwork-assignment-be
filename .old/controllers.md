# Controllers

Each entity provided in the Data model will have its own controller

* The controllers will be stored in their own domain directory, for instance
    * If we have an entity called User (a single word)
        * It will be placed inside the src/users directory
        * The file name will be user.controller.ts
    * If we have an entity called ShoppingCart (multiple words)
        * It will be placed inside the src/shopping-carts directory
        * The file name will be shopping-cart.controller.ts

### Employee
* Create - POST
* Get One - GET
* Update (partial update) - PUT
* Delete - DELETE
* List - GET
* Reset password - POST

### AbsenceRequest
* Create - POST
* Get One - GET
* Update (partial update) - PUT
* Delete - DELETE
* List - GET

### Feedback
* Create - POST
* Get One - GET
* Update (partial update) - PUT
* Delete - DELETE
* List - GET
