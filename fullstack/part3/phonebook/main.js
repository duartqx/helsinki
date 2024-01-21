import * as Types from "./src/persons/types.js";
import cors from "cors";
import errRes from "./errors.js";
import express from "express";
import morgan from "morgan";
import personRepository from "./src/repos/personMongo.js";
import { connect } from "./src/repos/connect.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use(express.static("dist"));

connect();

morgan.token("body", (/** @type {express.Request} */ request) => {
  if (request.method === "POST") {
    return JSON.stringify(request.body);
  }
});

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body"),
);

app.get("/info", async (_, response) => {
  const count = await personRepository.count();
  return response.send(`
    <div>
      <div>Phonebook has info for ${count} people</div>
      <br />
      <div>${new Date()}</div>
    </div>
  `);
});

app.get("/api/persons", async (_, response) => {
  return response.json(await personRepository.filter());
});

app.post("/api/persons", async (request, response, next) => {
  const body = /** @type {Types.PersonDTO} */ (request.body);
  const errors = await personRepository.validator(body, { unique: true });
  if (errors !== null) {
    return response.status(400).json(errors);
  }
  try {
    const savedPerson = await personRepository.create(body);
    return response.status(201).json(savedPerson);
  } catch (e) {
    return next(errRes.validationError(e));
  }
});

app.get("/api/persons/:id", async (request, response, next) => {
  try {
    if (!personRepository.isValidId(request.params.id)) {
      return next(errRes.malformedIdError());
    }
    const person = await personRepository.findById(request.params.id);
    return person ? response.json(person) : next(errRes.notFound());
  } catch {
    return next(errRes.internalServerError());
  }
});

app.delete("/api/persons/:id", async (request, response, next) => {
  try {
    if (!personRepository.isValidId(request.params.id)) {
      return next(errRes.malformedIdError());
    }
    await personRepository.deleteById(request.params.id);
    return response.status(204).end();
  } catch {
    return next(errRes.internalServerError());
  }
});

app.put("/api/persons/:id", async (request, response, next) => {
  try {
    if (!personRepository.isValidId(request.params.id)) {
      return next(errRes.malformedIdError());
    }

    const body = /** @type {Types.PersonDTO} */ (request.body);
    const errors = await personRepository.validator(body, { unique: false });
    if (errors !== null) {
      return response.status(400).json(errors);
    }

    const updatedPerson = await personRepository.updateById(
      request.params.id,
      body,
    );
    return updatedPerson
      ? response.json(updatedPerson)
      : next(errRes.notFound());
  } catch {
    return next(errRes.internalServerError());
  }
});

/**
 * @param {{ message: string, status: number }} error
 * @param {express.Request} request
 * @param {express.Response} response
 * @param {any} next
 */
const errorHandler = (error, request, response, next) => {
  if (error.status >= 400) {
    return response.status(error.status).send({ error: error.message });
  }
  return next(new Error(error.message));
};

app.use(errorHandler);

app.listen(3001);
