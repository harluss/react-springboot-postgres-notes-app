# Some Notes App (working title)

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/harluss/react-springboot-postgres-notes-app/Continuous%20Integration?logo=GitHub)

This a React/SpringBoot/Postgres app.

The main purpose of this project is to learn and practice.

### Features (in no particular order)

#### Backend
- [x] Spring Boot project with Gradle
- [x] Docker Compose with PostgreSQL
- [ ] Docker Compose with full project
- [x] Global exception handler
- [x] MapStruct mapper
- [x] Unit tests
- [ ] Integration tests **or** Contract tests
- [x] Pre-push hook (test and build locally)
- [x] CI workflow (test and build)
- [ ] JIB for containerization
- [ ] CD workflow (deployment to Docker Hub, AWS **and/or** Heroku)
- [x] CRUD operations
- [ ] Spring Security with JWT
- [x] Serve React project
- [ ] Liquibase migrations
- [ ] AOP logging (maybe)
- [x] Data validation
- [ ] ...

#### Frontend
- [x] React project with TypeScript
- [ ] Material UI
- [ ] Unit tests
- [ ] Redux **or** Recoil for state management
- [ ] Authentication with JWT
- [ ] E2E tests with Cypress (maybe)
- [ ] Speech to text
- [ ] ...

#### Docs
- [x] Swagger for backend
- [ ] StoryBook for frontend (maybe)
- [ ] ERD (updated as the project evolves)
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
