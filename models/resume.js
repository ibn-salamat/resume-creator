const { Schema, model } = require("mongoose");

const ResumeSchema = new Schema({
  title: String,
});

module.ResumeSchema = ResumeSchema;
module.exports = model("Resume", ResumeSchema);
