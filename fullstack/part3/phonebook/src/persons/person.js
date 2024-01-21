import * as Types from "./types.js"; // eslint-disable-line no-unused-vars

/**
 * @type {{
 *  persons: Types.Person[]
 *  validator: (personDTO: Types.PersonDTO) => Types.PersonError | null
 *  create: (personDTO: Types.PersonDTO) => Types.Person
 *  findById: (id: string | number) => Types.Person | undefined
 *  deleteById: (id: string | number) => boolean
 * }}
 **/
const personRepository = {
  persons: [
    {
      name: "Arto Hellas",
      number: "040-123456",
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
    },
    {
      name: "Diego Duterte",
      number: "55-83-6423122",
    },
  ],
  validator: function (personDTO) {
    const errors = /** @type {Types.PersonError} */ ({});
    if (!personDTO.name) {
      errors.name = "Name is required";
    }
    if (!personDTO.number) {
      errors.number = "Number is required";
    }
    if (
      this.persons.find(
        (n) => n.name.toLowerCase() === personDTO.name?.toLowerCase(),
      )
    ) {
      errors.unique = "Name must be unique";
    }
    return errors.name || errors.number || errors.unique ? errors : null;
  },
  create: function (personDTO) {
    const newPerson = /** @type {Types.Person} */ ({
      id: Math.floor(Math.random() * 999999),
      name: personDTO.name,
      number: personDTO.number,
    });

    this.persons = this.persons.concat(newPerson);

    return newPerson;
  },
  findById: function (id) {
    return this.persons.find((n) => n.id.toString() === id.toString());
  },
  deleteById: function (id) {
    let found = false;

    this.persons = this.persons.filter((n) => {
      const isMatch = n.id.toString() !== id.toString();
      if (!isMatch) {
        found = true; // Sets found to inform if something was deleted or not
      }
      return isMatch;
    });
    return found;
  },
};

export default personRepository;
