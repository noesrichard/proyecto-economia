# Loan Management System

This project is an Angular application designed to manage loans, deadlines, and taxes. It provides functionality for three types of users: admin, assessors, and users. The admin user has the authority to create banks and assign assessors. Assessors are responsible for managing tax values and deadlines, while users can utilize the loan simulation feature. The simulation feature allows users to view a table displaying the payment schedule for two amortization systems: German and French.

## Getting Started

To use this Loan Management System, follow the instructions below:

1. Ensure you have Node.js and Angular CLI installed on your system.
2. Clone this repository to your local machine or download the source code files.
3. Open a terminal or command prompt and navigate to the project directory.
4. Install the required dependencies by running the following command:

   ```shell
   npm install
   ```

5. Once the dependencies are installed, you can start the application by running the following command:

   ```shell
   ng serve
   ```

6. Open a web browser and navigate to `http://localhost:4200` to access the Loan Management System.

## Usage

Upon accessing the Loan Management System, users will be required to sign in with their respective user roles: admin, assessor, or user. Each user role provides different functionalities and access levels within the system.

### Admin

As an admin, you have the following capabilities:

- Create banks: You can create banks by providing the necessary details such as the bank name, address, and contact information.
- Assign assessors: You can assign assessors to specific banks. This allows assessors to manage tax values and deadlines for the assigned bank.

### Assessor

As an assessor, you have the following capabilities:

- Manage tax values: You can set and update tax values for different loan types and durations.
- Manage deadlines: You can define deadlines for loan payments and update them as necessary.

### User

As a user, you have the following capabilities:

- Loan Simulation: You can perform loan simulations using two different amortization systems: German and French. The simulation provides a table displaying the payment schedule, including details such as principal, interest, and remaining balance.

## Project Structure

The project follows a standard Angular application structure. The main components and files include:

- **src/app**: This directory contains the main application components, services, and modules.
- **src/app/components**: This directory contains the individual components used within the application, such as login, loan simulation, and admin panels.
- **src/app/services**: This directory contains the services responsible for handling API requests and data management.
- **src/app/models**: This directory contains the models used to structure the data within the application.
- **src/app/shared**: This directory contains shared components, directives, and utilities used across multiple components.

## Technologies Used

The Loan Management System is developed using the following technologies:

- Angular: A popular TypeScript-based framework for building web applications.
- Bootstrap: A CSS framework that provides pre-designed components and utilities for responsive web design.
- HTML: The standard markup language for creating web pages.
- CSS: The style sheet language used for styling the web pages.
- TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
