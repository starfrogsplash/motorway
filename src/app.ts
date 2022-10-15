import express from 'express'
import { json } from 'body-parser'
import {motorwayRouter} from './routes/motorwayRouter'
import swaggerJsdoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import expressPino from "express-pino-logger";

const app = express()

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "motorway API with Swagger",
            version: "0.1.0",
            description:
                "This is a motorway API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: "http://localhost:3000/",
            },
        ],
    },
    apis: ["**/*.ts"]
};

const specs = swaggerJsdoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
);

app.use(expressPino())
app.use(json())
app.use(motorwayRouter)

export { app }


