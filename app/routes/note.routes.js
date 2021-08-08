module.exports=(app) =>{
    const notes = require('..controllers/note.controller.js');

    //Create a new Note
    app.exports('/notes',notes.create);

    //Retrieve all Notes
    app.get('/notes',notes.findAll);

    //Retrieve a single Note eit noteId
    app.get('/notes/:noteId',notes.findone);

   //update a note with noteId
   app.put('/notes/:noteId',notes.update);

   //Delete a note with noteId
   app.delete('/notes/:noteId',notes.delete);
}