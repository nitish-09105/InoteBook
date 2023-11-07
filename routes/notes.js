const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
var fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require("express-validator");


// Route1: Get All the Notes using GET "/api/notes/getuser". login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route2: Add a new Note using POST "/api/auth/addnote". login required
router.post("/addnote",fetchuser,[
    body("title", "Enter a valid Titile").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({min: 5,}),],async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // checking errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


// Route3: Update an existing Note using POST "/api/notes/updatenote". login required
//      Update An Existing Note using: PUT "/api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  try {
      const {title,description,tag} = req.body

      const newNote = {}
      // Create a newNote object
      if(title){newNote.title = title}
      if(description){newNote.description = description}
      if(tag){newNote.tag = tag}

      // Find the note to be updated and update it
      // const note = Note.findByIdAndUpdate()
      let note = await Note.findById(req.params.id)
      if(!note){
          return res.status(404).send("Not Found")
      }

      if(note.user.toString() !== req.user.id){
          return res.status(401).send("Not Allowed")
      }

       note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})

      res.json({note})
  }
  catch(error){
      console.error(error.message);
      res.status(500).send("Internal Server Error")
  }

})

module.exports = router;
