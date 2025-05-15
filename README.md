# Location Log

A location tracking and area monitoring system built with NestJS. This application allows you to track user locations and monitor when users enter predefined geographical areas.

## Features

- User location tracking
- Geographical area management
- Automatic logging of area entries
- Real-time location monitoring
- Caching system for improved performance
- RESTful API endpoints

## Tech Stack

### Backend Framework & Core
- [NestJS](https://nestjs.com/) - Progressive Node.js framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language
- [Node.js](https://nodejs.org/) - Runtime environment

### Database & ORM
- [PostgreSQL](https://www.postgresql.org/) - Database
- [Prisma](https://www.prisma.io/) - Next-generation ORM

### Libraries & Tools
- [@turf/turf](https://turfjs.org/) - Geospatial analysis library
- [class-validator](https://github.com/typestack/class-validator) - Validation decorators
- [class-transformer](https://github.com/typestack/class-transformer) - Object transformation
- [@nestjs/cache-manager](https://docs.nestjs.com/techniques/caching) - Caching system
- [@nestjs/config](https://docs.nestjs.com/techniques/configuration) - Configuration management

### Development Tools
- [ESLint](https://eslint.org/) - Code linting
- [Prettier](https://prettier.io/) - Code formatting
- [Jest](https://jestjs.io/) - Testing framework
- [Supertest](https://github.com/visionmedia/supertest) - HTTP testing

## Prerequisites

- Node.js (v16 or later)
- PostgreSQL database
- Yarn package manager

## Installation

```bash
# Clone the repository
git clone [https://github.com/erkambozan/location-log.git]

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
yarn prisma migrate dev
```

## Running the Application

```bash
# Development
yarn start

# Watch mode
yarn start:dev

# Production mode
yarn start:prod
```

## API Endpoints

### Users
- `POST /users` - Create a new user
- `GET /users` - List all users

### Locations
- `POST /locations` - Add a location
  - Parameters:
    - `userId` (number): ID of the user
    - `latitude` (number): Latitude coordinate
    - `longitude` (number): Longitude coordinate
- `GET /locations` - List all locations

### Areas
- `POST /areas` - Create a new area
  - Parameters:
    - `polygon` (GeoJSON): Area polygon in GeoJSON format
- `GET /areas` - List all areas
- `GET /areas/:id` - Get a cached area by ID

### Logs
- `POST /logs` - Log a user's area entry
- `GET /logs` - List all logs

## Testing

```bash

# e2e tests
yarn test:e2e
```

## Database Schema

The application uses the following main models:
- User: Stores user information
- Location: Records user locations with latitude and longitude
- Area: Defines geographical areas using GeoJSON polygons
- Log: Tracks when users enter specific areas

## Environment Variables

Create a `.env` file in the root directory with the following variables:
```
DATABASE_URL="postgresql://user:password@localhost:5432/location_log?schema=public"
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.