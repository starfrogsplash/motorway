# Motorway App API

A motorway app api which has one to many relationship model (vehicles and its statelogs) built using:
TypeScript, jest, knex, postgres, Docker-compose

<img width="1324" alt="Screenshot 2022-10-17 at 00 44 22" src="https://user-images.githubusercontent.com/22579826/196064623-6af8e566-aaaf-4323-8dda-f594b2e8080e.png">


## Installation

You will need

- [docker](https://docs.docker.com/get-docker)
- [Node](https://nodejs.org/en/download)
- [TypeScript](https://www.typescriptlang.org/download)

### Instructions

1. you will need to create an .env file at the root of the this project, with these environment variables

```
DB_HOST=localhost
DB_USER=user
DB_PASS=password
DB=motorway
DB_TEST_HOST=localhost
TEST_USER=testUser
TEST_PASS=testPassword
DB_TEST=motorwayTest
```

2. To spin up databases and the app

```
docker-compose up
```

###
3. To run tests locally
###
```
npm run test
```

4. To spin close down the databases and the app

```
docker-compose down
```

###
To see Swagger docs go to this endpoint
###
```
http://localhost:3000/api-docs
```
