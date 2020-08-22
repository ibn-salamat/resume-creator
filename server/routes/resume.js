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
      console.log(resumeData);
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

// // get user by id
// router.get("/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findOne({ _id: id }).select("-password");
//     res.json({
//       message: "Success",
//       data: user,
//     });
//   } catch (error) {
//     res.status(404).json({ message: "User is not found", error: error.stack });
//   }
// });

// // get users list
// router.get("/list/:length", async (req, res) => {
//   const { length } = req.params;

//   try {
//     if (isNaN(Number(length))) throw new Error("Invalid length of users");

//     let users = await User.find()
//       .select("-password")
//       .limit(+length);

//     res.status(200).json({
//       message: "Success",
//       data: users,
//       length: users.length,
//     });
//   } catch (error) {
//     res.status(404).json({ message: "Error", error: error.stack });
//   }
// });

module.exports = router;
