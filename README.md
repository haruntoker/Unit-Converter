# Unit Converter Next.js App

## Dockerization Guide

This project is fully Dockerized for production-ready deployment using pnpm and Next.js best practices.

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed
- [pnpm](https://pnpm.io/) (for local development, not required for Docker)

---

### 1. Build and Run with Docker Compose (Recommended)


**docker-compose up --build**


- The app will be available at [http://localhost:3000](http://localhost:3000)

---

### 2. Manual Docker Build & Run

**Build the Docker image:**

```
docker build -t unit-converter-app .
```

**Run the container:**

```
docker run -p 3000:3000 unit-converter-app
```

---

### 3. File Overview

- `.dockerignore`: Excludes unnecessary files from the Docker image
- `Dockerfile`: Multi-stage, production-optimized build using pnpm
- `docker-compose.yml`: Simple service definition for local development/testing

---

### 4. Environment Variables

- Add any required environment variables to the `environment` section in `docker-compose.yml` or pass with `-e` when running `docker run`.

---

### 5. Production Best Practices

- Use multi-stage builds for small, secure images
- Set `NODE_ENV=production` for optimized builds
- Use environment variables for secrets/configuration
- Expose only necessary ports (3000)
- Use pnpm for dependency management

---

### 6. Troubleshooting

- Ensure ports are not in use (default: 3000)
- For build errors, check Docker and Next.js logs
- For advanced security, consider running as a non-root user

---

### 7. Useful Commands

- Stop all containers: `docker-compose down`
- View logs: `docker-compose logs -f`
- Rebuild without cache: `docker-compose build --no-cache`

---

For more details, see the Dockerfile and docker-compose.yml in this repo.
