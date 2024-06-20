# business-model-canvas

A simple open source web application for creating a business model canvas.

Uses Angular and the PrimeNG component library for the frontend, and Python with the FastAPI framework for the backend. Currently, the backend uses an SQLite database to avoid the requirement of running a database.

## Update generated API code

```bash
cd frontend
npm run generate-api-client
```

## How to build

Backend:

```bash
docker build -t bmc-backend backend
docker run -p 8080:8080 -it bmc-backend
```

## How to run
