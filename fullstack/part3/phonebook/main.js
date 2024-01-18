import express from "express";

const app = express();

app.use(express.json());

let notes = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/info", (_, response) => {
  return response.send(`
    <div>
      <div>Phonebook has info for ${notes.length} people</div>
      <br />
      <div>${new Date()}</div>
    </div>
  `);
});

app.get("/api/persons", (_, response) => {
  return response.json(notes);
});

app.get("/api/persons/:id", (request, response) => {
  const note = notes.find((n) => n.id.toString() === request.params.id);
  return note ? response.json(note) : response.status(404).end();
});

app.delete("/api/persons/:id", (request, response) => {
  notes = notes.filter((n) => n.id.toString() !== request.params.id)
  return response.status(204).end()
});

app.listen(3001);