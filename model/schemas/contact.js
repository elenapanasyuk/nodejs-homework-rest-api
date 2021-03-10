const { Schema, model, SchemaTypes } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      unique: true,
    },
    subscription: {
      type: String,
      default: "free",
      enum: ["free", "pro", "premium"],
    },

    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
    },

    // password: {
    //   type: String,
    //   required: [true, "Password is required"],
    // },
    // token: {
    //   type: String,
    //   default: "",
    // },
  },
  { versionKey: false }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
