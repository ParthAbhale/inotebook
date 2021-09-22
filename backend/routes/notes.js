const express = require("express");
const router = express.Router();
const Notes = require("../schemas/notes");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");

router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("author", "Enter a valid author").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
    fetchuser
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, author } = req.body;
      const notes = new Notes({
        title,
        description,
        author,
        user: req.user.id,
      });
      notes.save()
      res.send(notes);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

router.get("/fetchnote", fetchuser, async (req, res) => {
  try {
    const note = await Notes.find({ user: req.user.id });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const {title, description, author} = req.body
  const newData = {}
  if(title){newData.title = title}
  if(description){newData.description = description}
  if(author){newData.author = author}

  let new_note = await Notes.findById(req.params.id)
  if(!new_note){
    res.status(404).send("Not Found");
  }
  if(new_note.user.toString() === req.params.id){
    res.status(404).send("Not Allowed");
  }

  new_note = await Notes.findByIdAndUpdate(req.params.id,{$set: newData},{new:true})
  res.json({new_note})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  
});
router.delete("/delete/:id", fetchuser, async (req, res) => {
  try {
  let new_note = await Notes.findById(req.params.id)
  if(!new_note){
    res.status(404).send("Not Found");
  }
  if(new_note.user.toString() === req.params.id){
    res.status(404).send("Not Allowed");
  }
  new_note = await Notes.findByIdAndDelete(req.params.id)
  res.send("Successfully delted the note!")
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
  
});

module.exports = router;
