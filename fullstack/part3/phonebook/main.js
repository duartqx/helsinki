import cors from "cors";
import express from "express";
import morgan from "morgan";
import { connect } from "./src/repos/connect.js";
import personRepository from "./src/repos/personMongo.js";
import * as Types from "./src/persons/types.js";
import mongoose from "mongoose";

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
  const count = await personRepository.model.find().estimatedDocumentCount();

  return response.send(`
    <div>
      <div>Phonebook has info for ${count} people</div>
      <br />
      <div>${new Date()}</div>
    </div>
  `);
});

app.get("/api/persons", async (_, response) => {
  /** @type {typeof personRepository.model[]} */
  const persons = await personRepository.model.find();

  return response.json(persons);
});

app.post("/api/persons", async (request, response) => {
  const body = /** @type {Types.PersonDTO} */ (request.body);

  let errors = await personRepository.validator(body);
  if (errors !== null) {
    return response.status(400).json(errors);
  }

  try {
    /** @type {typeof personRepository.model} */
    const savedPerson = await (new personRepository.model(body)).save();
    return response.status(201).json(savedPerson);
  } catch (e) {
    return response.status(500).json(e);
  }
});

app.get("/api/persons/:id", async (request, response) => {
  /** @type {typeof personRepository.model | null} */
  const person = await personRepository.model.findById(
    new mongoose.Types.ObjectId(request.params.id),
  );

  return person ? response.json(person) : response.status(404).end();
});

app.delete("/api/persons/:id", async (request, response) => {
  await personRepository.model.deleteOne({
    _id: new mongoose.Types.ObjectId(request.params.id),
  });
  return response.status(204).end();
});

app.listen(3001);
