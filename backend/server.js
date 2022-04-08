// wmbc/backend/server.js
// Server backend API handler

const { PrismaClient } = require("@prisma/client");
const cors = require('cors')
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const PORT = process.env.port || 3001;
const app = express();
const prisma = new PrismaClient();
const jsonParser = bodyParser.json();

const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT",
  "optionSuccessStatus": 204,
}

app.use(cors(corsOptions));

// get retrieves
// random api call to test backend server
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// retrieve all programs
app.get("/programs", async (req, res) => {
  const programs = await prisma.program.findMany();
  res.json(programs);
});

// retrieve the programs with the specific id
app.get("/program/:id", async (req, res) => {
  const program = await prisma.program.findUnique({
    where: {
      id: parseInt(req.params.id),
    }
  });
  res.json(program);
});

// retrieves all audios
app.get("/audios", async (req, res) => {
  const audios = await prisma.audio.findMany();
  res.json(audios);
});

// retrieve the program with id
app.get("/audio/:id", async (req, res) => {
  const audio = await prisma.audio.findUnique({
    where: {
      id: parseInt(req.params.id),
    }
  });
  res.json(audio);
});

// retrieve all categories
app.get("/categories", async (req, res) => {
  const categories = await prisma.category.findMany();
  res.json(categories);
});

// retrieve the category withttp://localhost:3001/categoryh id
app.get("/category:id", async (req, res) => {
  const category = await prisma.category.findUnique({
    where: {
      id: parseInt(req.params.id),
    }
  });
  res.json(category);
});

// retrieves all the genres
app.get("/genres", async (req, res) => {
  const genres = await prisma.genre.findMany();
  res.json(genres);
});

// retrieve the genre with id
app.get("/genre/:id", async (req, res) => {
  const genre = await prisma.genre.findUnique({
    where: {
      id: parseInt(req.params.id),
    }
  });
  res.json(genre);
});

// stream for audio tag for the id in the url
app.get("/stream", (req, res) => {
  // get file ptah for the mp3 and gets stats
  var filePath = './audio_files/miscellaneous_audios/test_audio.mp3';
  var stat = fs.statSync(filePath);
  var total = stat.size;

  if (req.headers.range) {
    // use stats for the mp3 to make it possible for scrubbing and playing
    var range = req.headers.range;
    var parts = range.replace(/bytes=/, "").split("-");
    var partialStart = parts[0];
    var partialEnd = parts[1];

    var start = parseInt(partialStart, 10);
    var end = partialEnd ? parseInt(partialEnd, 10) : total - 1;
    var chunksize = (end - start) + 1;

    // create a read stream with the file and the start and end
    var rStream = fs.createReadStream(filePath, { start: start, end: end });

    res.writeHead(206, {
      'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
      'Accept-Ranges': 'bytes', 'Content-Length': chunksize,
      'Content-Type': 'audio/mpeg'
    });
    // pipe the audio back to the audio tag
    rStream.pipe(res);

  } else {
    res.send("Error - 404");
    res.end();
    //res.writeHead(200, { 'Content-Length': total, 'Content-Type': 'audio/mpeg' });
    //fs.createReadStream(filePath).pipe(res);
  }
});

// posts creation
// creates a program
app.post("/program", jsonParser, async (req, res) => {
  await prisma.program.create({
    data: {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      visibility: req.body.visibility,
      categories: req.body.categories,
      genres: req.body.genres,
      cover_path: req.body.cover_path,
    }
  });
  res.send("System Received a POST on creating a program");
});

// creates a audio
app.post("/audio", jsonParser, async (req, res) => {
  await prisma.audio.create({
    data: {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      visibility: req.body.visibility,
      programId: req.body.program_id,
      categories: req.body.categories,
      genres: req.body.genres,
      audio_path: req.body.audio_path,
      cover_path: req.body.cover_path,
    }
  });
  res.send("System Received a POST on creating a audio");
});

// creates a category
app.post("/category", jsonParser, async (req, res) => {
  console.log("Request Body:")
  console.log(req.body)
  console.log("\n")

  await prisma.category.create({
    data: {
      'name': req.body.name,
      'description': req.body.description,
    }
  });
  res.status(200).send("Success made the system work");
});

// creates a genre
app.post("/genre", jsonParser, async (req, res) => {
  await prisma.genre.create({
    data: {
      name: req.body.name,
      description: req.body.description,
    }
  });
  res.send("System Received a POST on creating a genre");
});

// put deletes
// delete the program and the subsequent audios attached to it
app.put("/program_delete/:id", (req, res) => {

});

// delete the audio
app.put("/audio_delete/:id", (req, res) => {

});

// delete the category
app.put("/category_delete/:id", (req, res) => {

});

// delete the genre
app.put("/genre_delete/:id", (req, res) => {

});

app.listen(PORT, () =>
  console.log('Server listening on %s', PORT)
);