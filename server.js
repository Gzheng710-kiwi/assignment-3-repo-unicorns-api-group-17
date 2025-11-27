const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
let unicorns = require("./data.js");
app.use(express.json());
app.use(express.static("public"));
app.get(`/unicorns`, (req, res) => {
  try {
    const namePassedFromClient = req.query.name;
    const lovesPassedFromClient = req.query.loves;
    const genderPassedFromClient = req.query.gender;
    const weightGreaterThan = req.query.weightGreaterThan;
    const weightLessThan = req.query.weightLessThan;
    const vampiresGreaterThan = req.query.vampiresGreaterThan;
    const vaccinated = req.query.vaccinated;
    const vampiresExists = req.query.vampiresExists;

    let result = unicorns;
    // name
    if (namePassedFromClient) {
      result = result.filter(
        (aUnicorn) => aUnicorn.name == namePassedFromClient
      );
    }
    // weight
    if (weightGreaterThan) {
      const w = Number(weightGreaterThan);
      result = result.filter((aUnicorn) => aUnicorn.weight > w);
    }

    // weight less than
    if (weightLessThan) {
      const w = Number(weightLessThan);
      result = result.filter((aUnicorn) => aUnicorn.weight < w);
    }
    // loves
    if (lovesPassedFromClient) {
      const lovesList = lovesPassedFromClient
        .split(",")
        .map((x) => x.trim().toLowerCase());
      result = result.filter((aUnicorn) =>
        lovesList.every((love) =>
          aUnicorn.loves.map((item) => item.toLowerCase()).includes(love)
        )
      );
    }

    // gender
    if (genderPassedFromClient) {
      result = result.filter(
        (aUnicorn) => aUnicorn.gender == genderPassedFromClient
      );
    }
    // vaccinated
    if (vaccinated != undefined && vaccinated !== "") {
      const vaccinatedBool = vaccinated == "true";
      result = result.filter((u) => u.vaccinated == vaccinatedBool);
    }
    // vampires
    if (vampiresGreaterThan) {
      const v = vampiresGreaterThan;
      result = result.filter((aUnicorn) => aUnicorn.vampires > v);
    }
    // vampires exist
    if (vampiresExists != undefined && vampiresExists !== "") {
      const existsBool = vampiresExists == "true";
      result = result.filter(
        (aUnicorn) => aUnicorn.vampiresExists == existsBool
      );
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Creating a New Unicorn
app.post("/unicorns", (req, res) => {
  const { name, dob, loves, weight, vampires, gender } = req.body;
  const newUnicorn = {
    name,
    dob,
    loves,
    weight: Number(weight),
    vampires: vampires,
    gender,
  };
  unicorns.push(newUnicorn);
  res.status(201).json(newUnicorn);
});

// Retrieving a Single Unicorn
app.get("/unicorns/:name", (req, res) => {
  const name = req.params.name;
  const unicorn = unicorns.find(
    (u) => u.name.toLowerCase() === name.toLowerCase()
  );
  if (!unicorn) {
    return res.status(404).json({ error: `Unicorn '${name}' not found.` });
  }
  res.json(unicorn);
});

// Updating a Unicorn
app.put("/unicorns/:name", (req, res) => {
  const index = unicorns.findIndex(
    (u) => u.name.toLowerCase() === req.params.name.toLowerCase()
  );

  if (index === -1) {
    return res.status(404).json({ error: "Unicorn not found." });
  }
  unicorns[index] = {
    name: req.body.name,
    dob: req.body.dob,
    loves: req.body.loves,
    weight: Number(req.body.weight),
    vampires: req.body.vampires,
    gender: req.body.gender,
  };

  res.json(unicorns[index]);
});

// Deleting a Unicorn
app.delete("/unicorns/:name", (req, res) => {
  const name = req.params.name;
  const index = unicorns.findIndex(
    (u) => u.name.toLowerCase() === name.toLowerCase()
  );
  if (index == -1) {
    return res.status(404).json({ error: `Unicorn '${name}' not found.` });
  }
  const deleted = unicorns.splice(index, 1)[0];
  res.json(deleted);
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong." });
});

app.listen(3000, () => {
  console.log(`everythin is good`);
});
