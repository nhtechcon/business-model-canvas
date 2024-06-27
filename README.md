# business-model-canvas

A simple open source web application for creating a business model canvas.

Uses Angular and the PrimeNG component library for the frontend, and Python with the FastAPI framework for the backend. Currently, the backend uses an SQLite database to avoid the requirement of running a database.

The purpose is to showcase the usage of...

- Common [Angular](https://angular.dev/) features such as components, services, routing
- The [PrimeNG](https://primeng.org/) library (components, drag-drop)
- [Ngrx](https://ngrx.io/) store and the [Redux](https://redux.js.org/) pattern for data management
- [FastAPI](https://fastapi.tiangolo.com/) as a REST API framework
- [SQLAlchemy](https://www.sqlalchemy.org/) as an object relational mapper
- Code generation of API client using [openapi-generator-cli](https://www.npmjs.com/package/@openapitools/openapi-generator-cli)

## Update generated API code

```bash
cd frontend
npm run generate-api-client
```

## How to build and run

To build and run the backend and frontend with docker, you can use

```bash
docker compose build
docker compose up
```

Or you can build each container on its own.

Backend:

```bash
docker build -t bmc-backend backend
docker run -p 8080:8080 -it bmc-backend
```

Frontend:

```bash
docker build -t bmc-frontend frontend
docker run -p 80:8080 -it bmc-frontend
```

## Run for local development

For development, you need to run the backend and the frontend:

```bash
cd backend
python3 main.py
```

In a second terminal:

```bash
cd frontend
npm start
```
