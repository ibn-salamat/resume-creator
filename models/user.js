const { Schema, model, SchemaType } = require("mongoose");
const { ResumeSchema } = require("./resume");

const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  resumes: {
    type: [ResumeSchema],
  },
});

module.exports = model("User", UserSchema);
