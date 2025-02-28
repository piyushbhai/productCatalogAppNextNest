# Product Catalog Application

This is a **Product Catalog** application built using **Next.js** (Frontend), **Nest.js** (Backend), and **PostgreSQL** (Database). The project supports both manual installation and Docker-based setup.

## Features
- **Frontend:** Next.js (React)
- **Backend:** Nest.js (Node.js Require version 23)
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose
- **API Communication:** REST API

---

## Manual Setup (Without Docker)

### **1. Clone the Repository**
```sh
git clone https://github.com/piyushbhai/productCatalogAppNextNest
cd productCatalogAppNextNest
```

### **2. Backend Setup (Nest.js)**
```sh
cd backend
npm install
```

#### **Setup Environment Variables**
Create a `.env` file in the `backend` directory and add the following:
```env
PORT=5000
FRONTEND_URL=http://localhost:3000
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=admin
DATABASE_NAME=product_catalog
```

#### **Setup Environment Variables**
Create a `.env` file in the `root` directory for docker composefile:
```env
PORT=5000
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=admin
DATABASE_NAME=product_catalog
NEXT_PUBLIC_API_URL=http://localhost:5000

```

#### **Start PostgreSQL (Local)**
Make sure PostgreSQL is installed and running on **port 5432**. Then create a database manually:
```sql
CREATE DATABASE product_catalog;
```

#### **Start Backend Server**
```sh
npm run start
```

### **3. Frontend Setup (Next.js)**
```sh
cd ../frontend
npm install
```

#### **Setup Environment Variables**
Create a `.env.local` file in the `frontend` directory and add the following:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### **Start Frontend Server**
```sh
npm run dev
```

Your application will be running at [http://localhost:3000](http://localhost:3000)

---

## Setup Using Docker

### **1. Clone the Repository**
```sh
git clone https://github.com/piyushbhai/productCatalogAppNextNest
cd productCatalogAppNextNest
```

### **2. Start Application with Docker Compose**
```sh
docker compose up --build
```

### **4. Access the Application**
- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)
- **PostgreSQL:** Running on **port 5432**

### **5. Stop Docker Containers**
To stop the containers without deleting them:
```sh
docker compose down
```

To remove volumes and reset the database:
```sh
docker compose down -v
```

---
## Folder Structure
```plaintext
product-catalog/
│── backend/        # Nest.js Backend
│── frontend/       # Next.js Frontend
│── docker-compose.yml  # Docker Configuration
│── README.md       # Project Documentation
```

---

## Contributors
- **Piyush Prajapati** - [Your GitHub](https://github.com/piyushbhai/)
