# 💰 rbac-finance-api

A robust **RESTful API** built with **Node.js, Express, and MongoDB** for managing financial records. This system features complete **Role-Based Access Control (RBAC)**, secure authentication, and optimized database aggregations for dashboard analytics.

---

## 🚀 Features

-   **Authentication & Security:** JWT-based authentication with hashed passwords (bcrypt) and **Rate Limiting**.
-   **Role-Based Access Control (RBAC):** Three distinct user tiers (`Admin`, `Analyst`, `Viewer`).
-   **Advanced Records Management:**
    -   **Pagination & Sorting**: Efficiently handle large datasets using `page`, `limit`, and `sortBy` query parameters.
    -   **Search & Filters**: Search records by category or notes, and filter by date range or transaction type.
    -   **Soft Delete**: Records are marked as deleted instead of being permanently removed, ensuring data integrity.
-   **Dashboard Analytics:** Uses MongoDB Aggregation Pipelines to calculate core financial metrics and trends.
-   **Interactive API Documentation:** Full **Swagger/OpenAPI** documentation available at `/api-docs`.
-   **Reliable Logic:** Comprehensive **Unit Testing** suite with Jest.

---

## 🛠️ Tech Stack

-   **Runtime:** Node.js
-   **Framework:** Express.js
-   **Database:** MongoDB & Mongoose
-   **Security:** JWT, bcryptjs, express-rate-limit
-   **Documentation:** Swagger UI, swagger-jsdoc
-   **Testing:** Jest, Supertest

---

## ⚙️ Local Setup & Installation

**1. Clone the repository**
```bash
git clone https://github.com/Pavank5214/rbac-finance-api.git
cd rbac-finance-api
```

**2. Install dependencies**
```bash
npm install
```

**3. Environment Variables**
Create a `.env` file in the root directory and add the following (see `.env.example`):
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

**4. Start the server**
```bash
# For development (with nodemon)
npm run dev

# For production
npm start
```

**5. Run Tests**
```bash
# Run all tests
npm test

# Run tests with exit (CI mode)
npm run test:ci
```

---

## 📖 API Documentation

### Interactive Documentation
The API is fully documented using Swagger. Start the server and navigate to:
👉 **[http://localhost:5000/api-docs](http://localhost:5000/api-docs)**

### Summary of Core Endpoints

#### Authentication & User Management
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Public | Register a new user |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| GET | `/api/auth/admin/users` | Admin | Get all users |

#### Financial Records
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| POST | `/api/records/` | Admin | Create a new financial record |
| GET | `/api/records/` | Admin, Analyst | Get records (supports pagination, search, sorting) |
| GET | `/api/records/:id` | Admin, Analyst | Get a single record by ID |
| DELETE | `/api/records/:id` | Admin | **Soft delete** a record |

#### Dashboard Summaries
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| GET | `/api/dashboard/summary` | Admin, Analyst, Viewer | Financial summary |
| GET | `/api/dashboard/categories` | Admin, Analyst, Viewer | Category-wise breakdown |
| GET | `/api/dashboard/trends` | Admin, Analyst, Viewer | Spending trends over time |

---

## 🤔 Assumptions & Design Decisions

1.  **Controller-Service-Route Architecture:** Ensures clean separation of concerns and testability.
2.  **Soft Deletion:** Records are flagged as `isDeleted: true` to prevent accidental data loss.
3.  **Search & Pagination:** Implemented at the database level for optimal performance on large datasets.
4.  **JWT Authentication:** Secure stateless session management via Bearer tokens.

---

**Author:** Pavan Kumar K