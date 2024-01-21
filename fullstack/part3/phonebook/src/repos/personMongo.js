import * as Types from "../persons/types.js";
import mongoose from "mongoose";

/**
 * @typedef {mongoose.Model<{
 *    _id?: mongoose.Types.ObjectId
 *    id?: string
 *    number: string
 *    name: string
 *    }>
 *  } Person
 **/

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [5, "Name must have at least 5 characters"],
    required: [true, "Name required"],
  },
  number: {
    type: String,
    minLength: [8, "Number too short"],
    required: [true, "Phone number required"],
    validate: {
      validator: (/** @type {string} */ number) => {
        return number.length >= 8 && /^\d{2,3}-\d+$/.test(number);
      },
      message: (/** @type {any} */ props) =>
        `${props.value} is not a valid phone number (Valid Ex: '090-2839283')`,
    },
  },
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
    const validateUnique = async (/** @type {string | undefined} */ name) => {
      const personExists = await this.model.findOne({
        name: { $regex: new RegExp(`^${personDTO.name}$`), $options: "i" },
      });
      return personExists ? "Name must be unique" : undefined;
    };

    const validation = new this.model(personDTO).validateSync();

    const errors = /** @type {Types.PersonError} */ ({});

    for (const key in validation?.errors || {}) {
      const value = (validation?.errors || {})[key];
      if (value) {
        errors[key] = value.message;
      }
    }

    if (option?.unique) {
      errors.unique = await validateUnique(personDTO.name);
    }

    return errors.name || errors.number || errors.unique ? errors : null;
  },
};

export default personRepository;
