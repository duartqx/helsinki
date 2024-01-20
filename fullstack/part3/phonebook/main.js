import cors from "cors";
import express from "express";
import morgan from "morgan";
import { connect } from "./src/repos/connect.js";
import personRepository from "./src/repos/personMongo.js";
import * as Types from "./src/persons/types.js";

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

app.post("/api/persons", async (request, response) => {
  const body = /** @type {Types.PersonDTO} */ (request.body);
  let errors = await personRepository.validator(body);
  if (errors !== null) {
    return response.status(400).json(errors);
  }
  try {
    const savedPerson = await personRepository.create(body);
    return response.status(201).json(savedPerson);
  } catch (e) {
    return response.status(500).json(e);
  }
});

app.get("/api/persons/:id", async (request, response) => {
  try {
    if (!personRepository.isValidId(request.params.id)) {
      return response.status(400).end();
    }
    const person = await personRepository.findById(request.params.id);
    return person ? response.json(person) : response.status(404).end();
  } catch (err) {
    return response.status(500).end();
  }
});

app.delete("/api/persons/:id", async (request, response) => {
  try {
    if (!personRepository.isValidId(request.params.id)) {
      return response.status(400).end();
    }
    await personRepository.deleteById(request.params.id);
    return response.status(204).end();
  } catch {
    return response.status(500).end();
  }
});

app.listen(3001);
