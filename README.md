# Some Notes App (working title)

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/harluss/react-springboot-postgres-notes-app/Continuous%20Integration?logo=GitHub)

This a React/SpringBoot/Postgres app.

The main purpose of this project is to learn more about React, TypeScript, Spring Boot and Postgres.

### Tech (in no particular order)

#### Backend
- [x] Spring Boot project with Gradle
- [x] Docker Compose with PostgreSQL
- [ ] Docker Compose with full project
- [x] Global exception handler
- [x] MapStruct mapper
- [x] Unit tests
- [x] Integration tests with MockMvc and Testcontainers
- [x] Pre-push hook (test and build locally)
- [x] CI workflow (test and build)
- [ ] JIB for containerization
- [ ] CD workflow (deployment to Docker Hub, AWS **and/or** Heroku)
- [x] CRUD operations
- [ ] Spring Security with JWT
- [x] Serve React project
- [x] Liquibase migrations
- [x] AOP logging
- [x] Data validation
- [x] Caching with Caffeine
- [x] Rate-limiting API calls with Bucket4j
- [ ] Versioning
- [ ] ...

#### Frontend
- [x] React project with TypeScript
- [x] Material UI
- [x] Unit tests
- [x] State management with Redux-Toolkit
- [x] CRUD
- [ ] Authentication with JWT
- [ ] E2E tests with Cypress (maybe)
- [ ] Speech to text
- [ ] Versioning
- [ ] ...

### Features
- [x] Notes
- [ ] Tags or categories
- [ ] Registration and authentication
- [ ] Speech to text
- [x] User preferences or settings (not persistent until users added)
- [ ] ...


#### Docs
- [x] Swagger for backend
- [ ] StoryBook for frontend (maybe)
- [x] ERD (updated as the project evolves)
- [ ] UI prototype (updated as the project evolves)

### Setup
Spin Postgres container up:
```
docker compose up
```
Bundle frontend and backend together - first time the build is run will set pre-push git hook:
```
./gradlew clean build
```
Access frontend at:
```
localhost:8080
```
Access Swagger UI at:
```
localhost:8080/swagger-ui.html
```
