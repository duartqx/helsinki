import * as Types from "../persons/types.js";
import mongoose from "mongoose";

/**
 * @typedef {mongoose.Model<{
 *    _id?: mongoose.Types.ObjectId
 *    id?: string
 *    number?: string | null | undefined;
 *    name?: string | null | undefined;
 *    }>
 *  } Person
 **/

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

/** @type {Person} */
const PersonModel = mongoose.model("Person", personSchema);

/**
 * @type {{
 *   model: typeof PersonModel
 *   count: () => Promise<number>
 *   filter: (f?: Object) => Promise<Person[]>
 *   create: (personDTO: Types.PersonDTO) => Promise<mongoose.Document<any, any, Person>>
 *   findById: (id: number | string) => Promise<Person | null>
 *   deleteById: (id: number | string) => Promise<boolean>
 *   updateById: (id: number | string, person: Types.Person) => Promise<mongoose.Document<any, any, Person>>
 *   isValidId: (id: number | string) => boolean
 *   validator: (personDTO: Types.PersonDTO, option?: { unique: boolean }) => Promise<Types.PersonError | null>
 * }}
 **/
const personRepository = {
  model: PersonModel,
  count: async function () {
    return this.model.find().estimatedDocumentCount();
  },
  filter: async function (f) {
    return f ? this.model.find(f) : this.model.find();
  },
  create: async function (personDTO) {
    return new this.model(personDTO).save();
  },
  findById: async function (id) {
    return this.model.findById(new mongoose.Types.ObjectId(id));
  },
  deleteById: async function (id) {
    return this.model
      .deleteOne({
        _id: new mongoose.Types.ObjectId(id),
      })
      .then(() => true);
  },
  updateById: function (id, personDTO) {
    return this.model.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      personDTO,
      { new: true },
    );
  },
  isValidId: function (id) {
    try {
      return Boolean(new mongoose.Types.ObjectId(id));
    } catch (e) {
      return false;
    }
  },
  validator: async function (personDTO, option) {
    const errors = /** @type {Types.PersonError} */ ({});

    if (!personDTO.name) {
      errors.name = "Name is required";
    }
    if (!personDTO.number) {
      errors.number = "Number is required";
    }

    if (option?.unique) {
      let person = await this.model.findOne({
        name: { $regex: new RegExp(`^${personDTO.name}$`), $options: "i" },
      });

      if (person) {
        errors.unique = "Name must be unique";
      }
    }

    return errors.name || errors.number || errors.unique ? errors : null;
  },
};

export default personRepository;
