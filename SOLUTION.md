# Solution Overview

This document describes the design, implementation, and assumptions for the Investment Performance Web API solution s

---

## Technology Stack

- Node.js (ESM)
- TypeScript
- Express
- Jest (unit testing)
- tsx (local development)

> This solution is implemented in TypeScript/Node.js to showcase familiarity with modern API design, asynchronous workflows, and testable service-oriented architecture. The overall structure maps cleanly to patterns commonly used in ASP.NET Core (controllers, services, repositories, middleware).

---

## Running the Application

### Prerequisites
- Node.js 25

### Install dependencies
```
npm install
```

### Run tests
```
npm test
```

### Run locally
```
npm run dev
```

The API will be available at 
```
http://lcaolhost:3000
```

## API Endpoints
### Get a list of current investments for the user
```
GET /api/users/:userId/investments
```
### Get details for a user's investment:
```
GET /api/users/:userId/investments/:investmentId
```

## Assumptions & Scope Decisions

* Data is stored in memory for simplicity
* Current prices are provided by a mocked pricing provider
* Authentication and authorization are out of scope
* No persistent database is included
* User context is provided via route parameters