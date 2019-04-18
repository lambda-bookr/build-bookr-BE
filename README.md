# Build-Bookr BackEnd

## Dependencies Used

- Node
- Express
- PostgreSQL (Production)
- SQLite3 (Development)
- Knex
- Knex Cleaner
- Bcryptjs
- Jsonwebtoken
- Cors
- Helmet
- Dotenv
- Faker
- Nodemon (Development)
- Cross-Env (Development)
- Jest (Development)
- Supertest (Development)

## Running The Project

If you would like to run this project locally, `cd` into the repository and run `yarn`. This will install the needed dependencies. Next you can run either `yarn start` to run the server using node or `yarn server` to run the server using nodemon. The purpose of using nodemon is to restart the server any time you make a change and save. You can also run `yarn test` if you would like to run tests. This will automatically set the knex config to testing using a dynamic environment variable.

## Restrictions

If you would like to make a request to the books, reviews, or users endpoint, a valid **JSON web token** is required in your request headers.authorization. This token is acquired by successfully registering an account or logging in.

## Description

This project is a RESTful API built using Node and Express. The purpose of this project is to provide a Backend for a Bookr web application. User registration, login, book and review creation, deletion, fetching, or editing, are all handled here. This project was deployed on `Heroku`.

- The server is run using Node.
- Express is a minimalist Node web application framework for building APIs.
- PostgreSQL is the database used for production. SQLite3 was used for development and testing.
- Knex is a SQL query builder for JavaScript.
- Knex Cleaner is a Knex dependency for cleaning up seed data.
- Jsonwebtoken is used for authenticating users.
- Bcrypt is used for hashing passwords.
- Helmet adds a base layer of security by hiding basic info about the API when interacting with it.
- Dotenv allows the server to interact with environment variables.
- Cors is a dependency used to allow Cross Origin Resource Sharing. This allows the Frontend client to interact with the Backend.
- Cross-env allows the developer to set environment variables in a script.
- Jest is the library used for writing tests.
- Supertest is the dependency used for making "requests" in jest tests.

## Endpoints

### Log In and Registration

**POST** `https://bookr-backend.herokuapp.com/api/auth/register` will create a new user and send back a token. Username, password, firstName, lastName are required fields.

**POST** `https://bookr-backend.herokuapp.com/api/auth/login` will log the user in, and send back a token. Username and password required.

### Books

**GET** `https://bookr-backend.herokuapp.com/api/books` will return an array of books.

**GET** `https://bookr-backend.herokuapp.com/api/books/:id` will return an object corresponding to the book at that ID.

**POST** `https://bookr-backend.herokuapp.com/api/books` will add a new book, and return the created object. user_id, author, name, price, and publisher are required fields. Description and imageUrl (image of the book cover) are optional fields.

**DEL** `https://bookr-backend.herokuapp.com/api/books/:id` will delete the book at this ID, and return the deleted object.

**PUT** `https://bookr-backend.herokuapp.com/api/books/:id` will edit the book at this ID, and return the edited object.

### Reviews

**GET** `https://bookr-backend.herokuapp.com/api/books/:id/reviews` will return an array of reviews for the book at this id.

**GET** `https://bookr-backend.herokuapp.com/api/reviews/:id` will return an object of the review at this id.

**POST** `https://bookr-backend.herokuapp.com/api/reviews` will post a review, and return the created object. The review, rating, book_id, and user_id are REQUIRED fields.

**DEL** `https://bookr-backend.herokuapp.com/api/reviews/:id` will delete the review at this id, and return the deleted object.

**PUT** `https://bookr-backend.herokuapp.com/api/reviews/:id` will edit the review at this id, and return the edited object.

**If you are running the project locally, every endpoint here is the same, but the heroku URL is replaced with `http://localhost:5000/`. For example, `GET` `http://localhost:5000/api/books` will return an array of books.**
