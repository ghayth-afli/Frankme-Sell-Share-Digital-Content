# FRAKNME

## Overview
FRAKNME is a file-sharing app designed for content creators such as photographers, designers, and social media influencers. Our main goal is to provide a secure and trustworthy platform where users can sell their creations without the risk of being exploited or deceived.

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)

## Project Structure
```bash
FRAKNME
│
├── front # Angular project
│ ├── src
│ ├── angular.json
│ ├── package.json
│ └── README.md
│
└── back/frankme # NestJS project
├── src
├── nest-cli.json
├── package.json
└── README.md
```
## Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)
- Angular CLI (v12.x or later)
- NestJS CLI (v7.x or later)

## Installation

### Clone the repository
```bash
git clone https://github.com/ghayth-afli/frankme.git
cd FRAKNME
```
### Install dependencies
#### Frontend (Angular)
```bash
cd front
npm install
```
#### Backend (NestJS)
```bash
cd back/frankme
npm install
```
## Running the Application
### Frontend (Angular)
```bash
cd front
ng serve
```
### Backend (NestJS)
```bash
cd back/frankme
npm run start
```

## Built With
- [Angular](https://angular.io/) - A platform and framework for building single-page client applications using HTML and TypeScript.
- [NestJS](https://nestjs.com/) - A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- [TypeScript](https://www.typescriptlang.org/) - A strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.
- [RxJS](https://rxjs.dev/) - A library for composing asynchronous and event-based programs by using observable sequences.
- [TypeORM](https://typeorm.io/) - An ORM for TypeScript and JavaScript (ES7, ES6, ES5) based on DataMapper, Unit of Work, and Identity Map patterns.
- [PostgreSQL](https://www.postgresql.org/) - A powerful, open source object-relational database system.
## Contributing
Contributions are welcome! If you'd like to contribute to FRAKNME, please follow these guidelines:

1. Fork the repository on GitHub.
2. Clone the forked repository to your local machine.
3. Create a new branch to work on: `git checkout -b feature/your-feature-name`.
4. Make your changes and commit them: `git commit -am 'Add some feature'`.
5. Push your changes to your forked repository: `git push origin feature/your-feature-name`.
6. Create a pull request (PR) against the main repository.
7. Wait for the maintainers to review your PR. Make sure your changes adhere to the project's coding standards and guidelines.
8. Once approved, your PR will be merged, and your contributions will be part of FRAKNME!

For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
