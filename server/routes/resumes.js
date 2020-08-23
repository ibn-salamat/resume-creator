const { Router } = require("express");
const Resume = require("../models/resume");
const User = require("../models/user");

const router = Router();

// Create Change
router.post("/save/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id == 0) {
      const resumeData = { ...req.body };
      const newResume = new Resume(resumeData);

      newResume.id = await newResume.validate().catch((error) => {
        console.log(error);
        throw new Error("validate");
      });

      const author = await User.findById(newResume.authorId).select("resumes");
      author.resumes.push(newResume);
      await User.findByIdAndUpdate(newResume.authorId, {
        resumes: author.resumes,
      });

      res.status(200).json({
        message: "Successful created",
      });
    }
  } catch (error) {
    if (error.message == "validate") {
      res.status(400).json({
        message: "Wrong data",
        error: {
          message: error.stack,
        },
      });
      return;
    }
    res.status(501).json({
      message: "Something has happened. Try again.",
      error: {
        message: error.stack,
      },
    });
  }
});

// get resumes
router.get("/list/:length", async (req, res) => {
  const { length } = req.params;

  try {
    if (length != "all") throw new Error("Invalid length of resumes");
    const users = await User.find()
      .select(
        "resumes resumes.title resumes._id resumes.name resumes.lastname resumes.authorId"
      )
      .lean();
    const resumes = [];
    users.map((user) => user.resumes.map((resume) => resumes.push(resume)));

    res.json({ message: "Success", data: resumes });
  } catch (error) {
    res.status(400).json({
      message: "Something has happened. Try again.",
      error: {
        message: error.stack,
      },
    });
  }
});

// get resume by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const users = await User.find().select("resumes").lean();
    const resumes = [];
    users.map((user) => user.resumes.map((resume) => resumes.push(resume)));
    const resume = resumes.find((resume) => resume._id == id);

    if (resume) {
      res.json({ message: "Success", data: resume });
    } else {
      throw new Error("Resume is not found.");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message || "Something has happened. Try again.",
      error: {
        message: error.stack,
      },
    });
  }
});
module.exports = router;
