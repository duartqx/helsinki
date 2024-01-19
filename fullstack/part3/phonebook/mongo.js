import mongoose from "mongoose";

if (process.argv.length < 3) {
  console.log("Missing argument: Password");
  process.exit(1);
}

const password = process.argv[2];

const connStr =
  `mongodb+srv://amandadesaothome:${password}@` +
  `cluster0helsinkiphoneap.fl76l8l.mongodb.net/?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(connStr);

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", PersonSchema);

const name = process.argv[3];
const number = process.argv[4];

if (name && number) {
  const person = new Person({
    name: name,
    number: number,
  });
  person.save().then((p) => {
    console.log(`Added "${p.name}" number "${p.number}" to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((persons) => {
    console.log("Phonebook:");
    for (let p of persons) {
      console.log(p.name, p.number);
    }
    mongoose.connection.close();
  });
}
