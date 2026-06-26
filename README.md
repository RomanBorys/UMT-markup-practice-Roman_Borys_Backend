# Flora Bouquets API

REST API for managing the Flora bouquet catalog.

The API is built with Node.js, Express, PostgreSQL, Sequelize, Joi, Multer, Gravatar, and Swagger.

## Live links

* [Backend repository](https://github.com/RomanBorys/UMT-markup-practice-Roman_Borys_Backend)
* [Live API](https://umt-markup-practice-roman-borys-backend.onrender.com/api/bouquets)
* [Swagger documentation](https://umt-markup-practice-roman-borys-backend.onrender.com/api-docs/)
* [Frontend website](https://romanborys.github.io/UMT-markup-practice-Roman_Borys/)

## Features

* PostgreSQL database
* Sequelize ORM
* REST architecture
* Controllers, services, routes, middleware, schemas, and helpers
* Centralized error handling
* Joi request validation
* CORS configuration
* Gravatar URL generation when creating a bouquet
* Photo upload with Multer
* Temporary and public photo directories
* Swagger/OpenAPI documentation
* Deployment on Render

## Technologies

* Node.js 24
* Express
* PostgreSQL
* Sequelize
* Joi
* Multer
* Gravatar
* Swagger UI Express
* CORS
* dotenv
* Render

## Bouquet model

```json
{
  "id": 1,
  "title": "Midnight Garden",
  "description": "A bouquet description.",
  "price": 98,
  "photoURL": "https://example.com/photo.png",
  "favorite": false
}
```

## API endpoints

### Get all bouquets

```http
GET /api/bouquets
```

Success status:

```text
200 OK
```

### Get one bouquet

```http
GET /api/bouquets/:id
```

Success status:

```text
200 OK
```

Not found:

```json
{
  "message": "Not found"
}
```

### Create a bouquet

```http
POST /api/bouquets
Content-Type: application/json
```

Request body:

```json
{
  "title": "Spring Garden",
  "description": "A fresh arrangement of seasonal flowers.",
  "price": 75.5,
  "favorite": false
}
```

The server generates `photoURL` through Gravatar.

Success status:

```text
201 Created
```

### Update a bouquet

```http
PUT /api/bouquets/:id
Content-Type: application/json
```

Example body:

```json
{
  "title": "Updated Spring Garden",
  "price": 85
}
```

At least one supported field must be provided.

Success status:

```text
200 OK
```

### Delete a bouquet

```http
DELETE /api/bouquets/:id
```

Success response:

```json
{
  "message": "Bouquet deleted"
}
```

Success status:

```text
200 OK
```

### Update favorite status

```http
PATCH /api/bouquets/:id/favorite
Content-Type: application/json
```

Request body:

```json
{
  "favorite": true
}
```

Success status:

```text
200 OK
```

### Upload a bouquet photo

```http
PATCH /api/bouquets/:id/photo
Content-Type: multipart/form-data
```

Multipart field name:

```text
photo
```

Supported formats:

```text
JPEG
PNG
WebP
```

Maximum file size:

```text
5 MB
```

Success response:

```json
{
  "photoURL": "https://backend.example.com/photos/unique-file-name.png"
}
```

## Environment variables

Create a `.env` file in the project root:

```dotenv
PORT=3000
NODE_ENV=development

FRONTEND_URLS=http://127.0.0.1:5500,http://localhost:5500,http://localhost:3000,http://127.0.0.1:3000

DATABASE_URL=postgresql://username:password@hostname:5432/database_name
DATABASE_SSL=true
```

Never commit the real `.env` file.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/RomanBorys/UMT-markup-practice-Roman_Borys_Backend.git
```

2. Open the project directory:

```bash
cd UMT-markup-practice-Roman_Borys_Backend
```

3. Install dependencies:

```bash
npm install
```

4. Create and configure `.env`.

5. Start development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

A successful database connection prints:

```text
Database connection successful
```

## Project structure

```text
.
├── public/
│   └── photos/
├── temp/
├── src/
│   ├── configs/
│   ├── controllers/
│   ├── docs/
│   ├── helpers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── schemas/
│   ├── services/
│   └── app.js
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

## Validation

The API validates:

* Required create fields
* Positive numeric prices
* Boolean favorite values
* Non-empty update bodies
* Unknown request fields
* Positive integer route IDs
* Uploaded file type
* Uploaded file size

Validation errors return:

```json
{
  "message": "Validation error message"
}
```

with status:

```text
400 Bad Request
```

## API documentation

Swagger UI is available at:

```text
https://umt-markup-practice-roman-borys-backend.onrender.com/api-docs/
```

The OpenAPI document contains:

* `Bouquet`
* `BouquetCreate`
* `BouquetUpdate`
* Favorite update schema
* Photo upload schema
* Error responses
* All implemented routes

## Deployment

The backend is deployed as a Render Web Service and uses Render PostgreSQL.

Production environment variables are configured in the Render dashboard and are not stored in the repository.

## Author

Roman Borys

* [GitHub profile](https://github.com/RomanBorys)
