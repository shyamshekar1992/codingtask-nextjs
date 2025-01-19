Project ReadMe

Project Overview

This project is a full-stack web application built using Next.js for the frontend and MongoDB as the primary database. The project integrates GitHub OAuth for user authentication and incorporates advanced schema validation techniques using Yup on the frontend and Zod on the backend. The application is styled with Tailwind CSS, ensuring a modern and responsive UI. Hosting is managed through AWS Amplify, and the application can be containerized and run using Docker.

Key Features

Frontend:

Built with Next.js for a seamless user experience.

Form validation using Yup.

Responsive design powered by Tailwind CSS.

Backend:

Schema validation using Zod for type safety.

Integration with MongoDB for robust database management.

Authentication:

GitHub OAuth for secure and convenient login.

Hosting:

Hosted on AWS Amplify for scalability and reliability.

Containerization:

Supports Docker for containerized deployments.

Prerequisites

Node.js (v14 or later)

Yarn package manager

Docker (optional for containerized deployment)

Installation and Setup

1. Clone the Repository

 git clone https://github.com/mongodb-developer/nextjs-with-mongodb
 cd nextjs-with-mongodb

2. Install Dependencies

 yarn install

3. Configure Environment Variables

Create a .env.local file in the root of the project and configure the following variables:

NEXT_PUBLIC_MONGO_URI=<Your MongoDB URI>
NEXT_PUBLIC_GITHUB_CLIENT_ID=<Your GitHub OAuth Client ID>
NEXT_PUBLIC_GITHUB_CLIENT_SECRET=<Your GitHub OAuth Client Secret>
AMPLIFY_API_KEY=<Your Amplify API Key>
NEXT_PUBLIC_BASE_URL1=mongodb+srv://shyamshekar1992:FffTiZhFHT4ovt2Y@cluster0.071ac.mongodb.net/
# NEXT_PUBLIC_BASE_URL=https://main.d3sojnxjwm1p4o.amplifyapp.com/

# NEXT_PUBLIC_API_BASE_URL=https://main.d3sojnxjwm1p4o.amplifyapp.com
NEXT_PUBLIC_BASE_URL2=Ov23lirNlQFDDMRJqlMR
NEXT_PUBLIC_BASE_URL3=bcfdae98ad86efaec0176968d8a1828cac9a83fa
NEXT_PUBLIC_BASE_URL4=f2e4a1d8c6f04b2a85c7e1d6c7e4b5a8f1d2c3e4f5a7c9e0d1b6f4e3c2a5d8b2
# NEXT_PUBLIC_BASE_URL5=https://main.d3sojnxjwm1p4o.amplifyapp.com/
# NEXT_PUBLIC_BASE_URL6=https://main.d3sojnxjwm1p4o.amplifyapp.com/
# NEXTAUTH_URL=https://main.d3sojnxjwm1p4o.amplifyapp.com
NEXT_PUBLIC_BASE_URL5=http://localhost:3000/
NEXT_PUBLIC_BASE_URL6=http://localhost:3000/
NEXTAUTH_URL=http://localhost:3000/

4. Start the Development Server

 yarn dev

Building and Running the Project

1. Build the Project

 yarn build

2. Start the Production Server

 yarn start

3. Run with Docker

Build the Docker image and run the container:

 docker build -t testapp .
 docker run -p 3000:3000 testapp

Architectural Decisions

Next.js for Frontend:

Chosen for its server-side rendering capabilities, ease of development, and robust ecosystem.

MongoDB:

Selected as the primary database for its flexibility and scalability to manage application data.

GitHub OAuth:

Implemented for secure user authentication and reduced friction for users.

Yup and Zod for Validation:

Frontend: Yup simplifies form validation with a declarative syntax.

Backend: Zod ensures runtime validation and type safety.

Tailwind CSS:

Adopted for its utility-first approach, allowing rapid styling and customization.

AWS Amplify:

Offers seamless hosting, CI/CD integration, and scalability for modern web applications.

Docker:

Facilitates containerized deployments, ensuring consistency across environments.

Development Workflow

Clone the repository and configure dependencies.

Run the development server locally using yarn dev.

Build and test using yarn build and yarn start.

Deploy using AWS Amplify or run the containerized application with Docker.

Future Enhancements

Add support for additional OAuth providers.

Implement caching mechanisms for faster API responses.

Enhance test coverage with integration and unit tests.

Add localization support for multilingual users.

Contribution Guidelines

Fork the repository and create a feature branch.

Submit a pull request with detailed documentation of your changes.

Ensure your code adheres to the project's linting and formatting standards.

