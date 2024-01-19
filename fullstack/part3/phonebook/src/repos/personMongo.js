import * as Types from "../persons/types.js";
import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const PersonModel = mongoose.model("Person", personSchema);

/**
 * @type {{
 *   validator: (personDTO: Types.PersonDTO) => Promise<Types.PersonError | null>
 *   model: mongoose.Model
 * }}
 **/
const personRepository = {
  model: PersonModel,
  validator: async function (personDTO) {
    const errors = /** @type {Types.PersonError} */ ({});
    if (!personDTO.name) {
      errors.name = "Name is required";
    }
    if (!personDTO.number) {
      errors.number = "Number is required";
    }

    let person = await this.model.findOne(
      { name: { $regex: new RegExp(`^${personDTO.name}$`), $options: 'i' } }
    );

    if (person) {
      errors.unique = "Name must be unique";
    }

    return errors.name || errors.number || errors.unique ? errors : null;
  },
};

export default personRepository;
