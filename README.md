# Full_Stack_Back_End

<h1>Backend Requirements (Node.js, Express, MongoDB):</h1>

<h2>1. API Development : </h2>

- Building a RESTful API using Node.js and Express that includes :

* GET /api/products: Fetch a list of products (public access).
  - POST /api/products: Create a new product (authenticated users only).
    - PUT /api/products/:id: Update an existing product (authenticated users only).
      - DELETE /api/products/:id: Delete a product (authenticated users only).

<h3>Using Mongoose to define models and manage product data.</h3>
<h3>Protect sensitive routes (create, update, delete) using authentication middleware</h3>

<h2>2. Authentication and Authorization :</h2>

- Implementing user registration and login functionality.
  - POST /api/auth/signup: Register a new user with hashed passwords.
  - POST /api/auth/login: Authenticate user and return a JWT access token.

* Use JWT (JSON Web Tokens) to protect routes :
  - Attached the token to protected routes (like creating, updating, and deleting products).
  - Created middleware to verify the token and authorize users.

<h2>3. Database : </h2>

- Setting up MongoDB with Mongoose for managing user and product data.
- Ensuring proper relationships between users and products (e.g., products created by specific users).

<h2>4. Error Handling : </h2>

- Implemented proper error handling, ensuring that errors such as authentication failures or invalid token errors are correctly handled and reported with appropriate status codes.
- Returned meaningful responses for all API requests (e.g., 401 Unauthorized for protected routes without tokens, 404 Not Found for invalid product IDs).

<h2>5. Utility Functions :</h2>

   - Implemented user role management, such as admin users who can manage all products and regular users who can only manage their own products.
   - Added pagination, search, and filter functionality for large datasets in the product list.
