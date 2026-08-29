# 🔐 AuthPro API

A production-oriented **Authentication & Authorization REST API** built with **Node.js, Express.js, MongoDB, and JWT**.

AuthPro API provides a secure and scalable foundation for handling user authentication, authorization, password security, request validation, and protected API resources.

> 🚧 **Project Status:** In Development
> More authentication features such as refresh tokens, email verification, password reset, OAuth, and role-based authorization are planned for future releases.

---

## 🚀 Features

### Authentication

* ✅ User Registration
* ✅ User Login
* ✅ User Logout
* ✅ JWT Access Token Authentication
* ✅ Protected Routes
* ✅ Password Hashing with bcrypt
* ✅ Request Validation with Zod

### User Management

* ✅ User Profile Endpoint
* ✅ User Roles (`user`, `admin`)
* ✅ Email Verification Status
* ✅ Password Change Tracking
* 🔄 Refresh Token Support
* 🔄 Password Reset
* 🔄 Email Verification

### Security

* 🔐 Password hashing using bcrypt
* 🔑 JWT-based authentication
* 🛡️ Protected API routes
* ✅ Input validation using Zod
* 🛡️ Helmet security middleware
* 🚦 Rate limiting support
* 🌐 CORS support
* 🍪 Cookie parsing support

---

## 🛠️ Tech Stack

| Technology             | Purpose               |
| ---------------------- | --------------------- |
| **Node.js**            | JavaScript runtime    |
| **Express.js**         | REST API framework    |
| **MongoDB**            | Database              |
| **Mongoose**           | MongoDB ODM           |
| **JWT**                | Authentication        |
| **bcrypt**             | Password hashing      |
| **Zod**                | Request validation    |
| **Helmet**             | HTTP security         |
| **CORS**               | Cross-origin requests |
| **express-rate-limit** | Rate limiting         |
| **cookie-parser**      | Cookie handling       |
| **Nodemailer**         | Email functionality   |
| **dotenv**             | Environment variables |
| **Nodemon**            | Development server    |

The current `package.json` includes these core dependencies and uses CommonJS modules.

---

## 📁 Project Structure

```text
authpro-1/
│
├── src/
│   │
│   ├── controllers/
│   │   ├── auth.controllers.js
│   │   └── user.controller.js
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js
│   │
│   ├── models/
│   │   └── User.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── user.routes.js
│   │
│   ├── services/
│   │   └── auth.service.js
│   │
│   ├── utils/
│   │   └── jwt.js
│   │
│   ├── validators/
│   │   └── auth.validators.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

The repository currently follows a layered backend structure separating controllers, middleware, models, routes, services, utilities, and validators.

---

# ⚙️ Getting Started

## 1. Clone the Repository

```bash
git clone https://github.com/Aryanboii/authpro-1.git
```

Navigate into the project:

```bash
cd authpro-1
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_ACCESS_SECRET=your_super_secret_access_key

JWT_ACCESS_EXPIRES_IN=15m
```

### Environment Variables

| Variable                | Description                           |
| ----------------------- | ------------------------------------- |
| `PORT`                  | Port on which the API runs            |
| `MONGODB_URI`           | MongoDB connection string             |
| `JWT_ACCESS_SECRET`     | Secret used to sign JWT access tokens |
| `JWT_ACCESS_EXPIRES_IN` | Access-token expiration time          |

The server loads the root `.env` file and connects to MongoDB using `MONGODB_URI`.

> ⚠️ Never commit your real `.env` file or JWT secrets to GitHub.

---

# ▶️ Running the Application

### Development

```bash
npm run dev
```

This starts the server using Nodemon.

### Production

```bash
npm start
```

The application starts from:

```text
src/server.js
```

By default, the API runs on:

```text
http://localhost:5000
```

---

# 🔗 API Endpoints

## Authentication

### Register

```http
POST /api/v1/auth/register
```

### Request Body

```json
{
  "name": "Aryan",
  "email": "aryan@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "USER_ID",
      "name": "Aryan",
      "email": "aryan@example.com",
      "role": "user",
      "isEmailVerified": false
    }
  }
}
```

Passwords are hashed with bcrypt before being stored in MongoDB.

---

## Login

```http
POST /api/v1/auth/login
```

### Request Body

```json
{
  "email": "aryan@example.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "accessToken": "YOUR_JWT_ACCESS_TOKEN",
    "user": {
      "id": "USER_ID",
      "name": "Aryan",
      "email": "aryan@example.com",
      "role": "user",
      "isEmailVerified": false
    }
  }
}
```

The access token contains the user's ID and role and currently defaults to a **15-minute expiration** unless `JWT_ACCESS_EXPIRES_IN` is configured.

---

## Logout

```http
POST /api/v1/auth/logout
```

### Headers

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

Logout requires authentication.

```text
Authorization
      │
      ▼
auth.middleware.js
      │
      ▼
logout controller
      │
      ▼
logout service
```

The current logout implementation clears the user's stored refresh-token field.

---

# 👤 User Endpoints

## Get Profile

```http
GET /api/v1/users/profile
```

### Headers

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

### Example

```bash
curl http://localhost:5000/api/v1/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

This route is protected by the authentication middleware.

---

# 🔐 Authentication Flow

AuthPro uses JWT-based authentication.

```text
             ┌──────────────┐
             │    Client    │
             └──────┬───────┘
                    │
                    ▼
             POST /login
                    │
                    ▼
          ┌──────────────────┐
          │ Express Router   │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ Zod Validation   │
          └────────┬─────────┘
                   │
                   ▼
          ┌──────────────────┐
          │ Auth Service     │
          └────────┬─────────┘
                   │
             bcrypt.compare()
                   │
                   ▼
          ┌──────────────────┐
          │ Generate JWT     │
          └────────┬─────────┘
                   │
                   ▼
             Access Token
                   │
                   ▼
                Client
```

The JWT currently contains:

```json
{
  "userID": "USER_ID",
  "role": "user"
}
```

and is signed using `JWT_ACCESS_SECRET`.

---

# 🧑‍💻 User Model

The current user model contains:

```text
User
│
├── name
├── email
├── password
├── role
├── isEmailVerified
├── refreshToken
├── passwordChangedAt
├── passwordResetToken
├── passwordResetExpires
├── emailVerificationToken
├── emailVerificationExpires
├── createdAt
└── updatedAt
```

Roles currently supported:

```text
user
admin
```

Passwords are excluded from normal Mongoose queries using:

```javascript
select: false
```

The schema also uses Mongoose timestamps.

---

# 🧪 Validation

AuthPro uses **Zod** to validate incoming request bodies before they reach the authentication service.

### Registration Validation

```text
name
├── minimum: 2 characters
└── maximum: 50 characters

email
└── must be a valid email

password
└── minimum: 8 characters
```

### Login Validation

```text
email
└── valid email

password
└── minimum: 8 characters
```

This prevents invalid request data from reaching the business-logic layer.

---

# 🏗️ Architecture

AuthPro follows a layered backend architecture:

```text
                 Client
                   │
                   ▼
                Routes
                   │
                   ▼
              Middleware
                   │
                   ▼
              Controllers
                   │
                   ▼
               Services
                   │
             ┌─────┴─────┐
             ▼           ▼
           Model       Utils
             │
             ▼
           MongoDB
```

### Routes

Responsible for defining API endpoints.

### Middleware

Responsible for authentication and request processing.

### Controllers

Handle HTTP requests and responses.

### Services

Contain business logic such as registration, login, and logout.

### Models

Define MongoDB data structures using Mongoose.

### Validators

Validate incoming API data using Zod.

### Utils

Contain reusable utilities such as JWT generation.

---

# 🛡️ Security Practices

AuthPro is being designed with security as a core requirement.

Current security mechanisms include:

* Password hashing with bcrypt
* JWT authentication
* Protected routes
* Input validation
* HTTP security headers through Helmet
* Rate-limiting support
* CORS configuration
* Environment-based secrets
* Password exclusion from normal database queries

---

# 🗺️ Roadmap

The project is being developed incrementally toward a complete production authentication system.

### Phase 1 — Core Authentication

* [x] User registration
* [x] User login
* [x] Password hashing
* [x] JWT access tokens
* [x] Authentication middleware
* [x] Protected profile route
* [x] Logout
* [x] Zod validation

### Phase 2 — Token Management

* [ ] Refresh token generation
* [ ] Refresh token rotation
* [ ] Access-token renewal
* [ ] Token revocation
* [ ] Multiple-device session management

### Phase 3 — Email Authentication

* [ ] Email verification
* [ ] Verification token generation
* [ ] Verification email
* [ ] Resend verification email

### Phase 4 — Password Recovery

* [ ] Forgot password
* [ ] Password reset token
* [ ] Reset password
* [ ] Password-change invalidation
* [ ] Reset email

### Phase 5 — Authorization

* [ ] Role-based access control
* [ ] Admin middleware
* [ ] Admin routes
* [ ] Permission system

### Phase 6 — OAuth

* [ ] Google OAuth
* [ ] OAuth account linking
* [ ] OAuth callback handling

### Phase 7 — Production Hardening

* [ ] Global error-handling middleware
* [ ] Request logging
* [ ] API documentation
* [ ] Automated tests
* [ ] Integration tests
* [ ] CI/CD
* [ ] Production deployment
* [ ] Monitoring
* [ ] Security auditing

---

# 📌 Example Request Flow

### Registration

```text
POST /api/v1/auth/register
        │
        ▼
registerSchema.parse()
        │
        ▼
registerUser()
        │
        ├── Check existing user
        │
        ├── Hash password
        │
        └── Create user
        │
        ▼
201 Created
```

### Login

```text
POST /api/v1/auth/login
        │
        ▼
loginSchema.parse()
        │
        ▼
loginUser()
        │
        ├── Find user
        ├── Compare password
        └── Generate JWT
        │
        ▼
200 OK
```

---

# 📮 API Base URL

For local development:

```text
http://localhost:5000/api/v1
```

Authentication endpoints:

```text
/api/v1/auth/register
/api/v1/auth/login
/api/v1/auth/logout
```

User endpoints:

```text
/api/v1/users/profile
```

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

### 1. Fork the repository

```bash
git fork
```

### 2. Create a branch

```bash
git checkout -b feature/your-feature
```

### 3. Commit your changes

```bash
git add .
git commit -m "feat: add your feature"
```

### 4. Push your branch

```bash
git push origin feature/your-feature
```

### 5. Open a Pull Request

---

# 📄 License

This project is currently released under the **ISC License**.

---

# 👨‍💻 Author

**Aryan**

GitHub:
https://github.com/Aryanboii

Repository:
https://github.com/Aryanboii/authpro-1

---

## ⭐ Project Goal

AuthPro API is being built as a **production-grade authentication backend** to demonstrate modern backend development practices including:

* REST API design
* Authentication & authorization
* JWT
* MongoDB
* Mongoose
* Password security
* Request validation
* Middleware architecture
* Service-layer architecture
* API security
* Scalable backend architecture

The goal is to evolve AuthPro from a basic authentication API into a complete, secure, and production-ready authentication system.
