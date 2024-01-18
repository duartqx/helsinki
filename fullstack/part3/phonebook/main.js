import express from "express";
import morgan from "morgan";
import personRepository from "./src/persons/person.js";
import * as Types from "./src/persons/types.js"

const app = express();

app.use(express.json());

app.use(morgan("tiny"));

app.get("/info", (_, response) => {
  return response.send(`
    <div>
      <div>Phonebook has info for ${
        personRepository.persons.length
      } people</div>
      <br />
      <div>${new Date()}</div>
    </div>
  `);
});

app.get("/api/persons", (_, response) => {
  return response.json(personRepository.persons);
});

app.post("/api/persons", (request, response) => {
  const body = /** @type {Types.PersonDTO} */ (request.body);

  let errors = personRepository.validator(body);
  if (errors !== null) {
    return response.status(400).json(errors);
  }
  response.status(201).json(personRepository.create(body));
});

app.get("/api/persons/:id", (request, response) => {
  const note = personRepository.findById(request.params.id);
  return note ? response.json(note) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  personRepository.deleteById(request.params.id);
  return response.status(204).end();
});

app.listen(3001);
