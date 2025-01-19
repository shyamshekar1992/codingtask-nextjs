# Project ReadMe

## Project Overview

This project is a full-stack web application built using Next.js for the frontend and MongoDB as the primary database. The project integrates GitHub OAuth for user authentication and incorporates advanced schema validation techniques using Yup for validation. The application is styled with Tailwind CSS, ensuring a modern and responsive UI. Hosting is managed through AWS Amplify, and the application can be containerized and run using Docker.

## Key Features

### Frontend:
- Built with Next.js for a seamless user experience.
- Form validation using Yup.
- Responsive design powered by Tailwind CSS.

### Backend:
- Integration with MongoDB for robust database management.

### Authentication:
- GitHub OAuth for secure and convenient login.

### Hosting:
- Hosted on AWS Amplify for scalability and reliability.

### Containerization:
- Supports Docker for containerized deployments.

## Prerequisites

- Node.js (v18 or later)
- Yarn package manager
- Docker (optional for containerized deployment)

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/mongodb-developer/nextjs-with-mongodb
cd nextjs-with-mongodb
```

### 2. Install Dependencies
```bash
yarn install
```

### 3. Configure Environment Variables
Create a `.env.local` file in the root of the project and configure the following variables:

```env
get mongodb atlas connection
NEXT_PUBLIC_BASE_URL1=

Create keys with github
NEXT_PUBLIC_BASE_GITUSER=
NEXT_PUBLIC_BASE_GITPASS=
NEXT_PUBLIC_BASE_SECRET=

For running in local server
NEXT_PUBLIC_BASE_URL=http://localhost:3000/
NEXTAUTH_URL=http://localhost:3000/

```

### 4. Start the Development Server
```bash
yarn dev
```

## Building and Running the Project

### 1. Build the Project
```bash
yarn build
```

### 2. Start the Production Server
```bash
yarn start
```

### 3. Run with Docker
Build the Docker image and run the container:
```bash
docker build -t testapp .
docker run -p 3000:3000 testapp
```

## Architectural Decisions

### Next.js for Frontend:
Chosen for its server-side rendering capabilities, ease of development, and robust ecosystem.

### MongoDB:
Selected as the primary database for its flexibility and scalability to manage application data.

### GitHub OAuth:
Implemented for secure user authentication and reduced friction for users.

### Yup  for Validation:
 Yup simplifies form validation with a declarative syntax.

### Tailwind CSS:
Adopted for its utility-first approach, allowing rapid styling and customization.

### AWS Amplify:
Offers seamless hosting, CI/CD integration, and scalability for modern web applications.

### Docker:
Facilitates containerized deployments, ensuring consistency across environments.

## Development Workflow

1. Clone the repository and configure dependencies.
2. Run the development server locally using `yarn dev`.
3. Build and test using `yarn build` and `yarn start`.
4. Deploy using AWS Amplify or run the containerized application with Docker.

## Future Enhancements

- Add support for additional OAuth providers.
- Implement caching mechanisms for faster API responses.
- Enhance test coverage with integration and unit tests.
- Add localization support for multilingual users.

## Contribution Guidelines

1. Fork the repository and create a feature branch.
2. Submit a pull request with detailed documentation of your changes.
3. Ensure your code adheres to the project's linting and formatting standards.
