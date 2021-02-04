const express = require("express");
const { spawn } = require("child_process");
const app = express();
const port = 3000;

// put index.html file in folder /dist
app.get("/", (req, res) => {
  const distPath = path.join(__dirname, "../dist/index.html");
  res.sendFile(distPath);
});

// function to call python script
app.get("/send", (req, res) => {
  allres = [];
  // spawn new child process to call the python script
  const python = spawn("python", ["scriptname.py"]);

  // collect data from script
  python.stdout.on("data", function (data) {
    console.log("Pipe data from python script ...");
    //dataToSend =  data;
    allres.push(data);
  });

  // in close event we are sure that stream is from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    res.send(allres);
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
