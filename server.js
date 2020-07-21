const express = require("express");
const app = express();
const port = 5000;
const dataProvider = require("wroclaw-transport-data-provider");

app.get("/bikes", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  dataProvider
    .getBikeData([15121, 15153])
    .then((data) => res.send(data))
    .catch(console.log);
});

app.get("/mpk", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  dataProvider
    .getMpkData([
      {
        name: "Kleczkowska Tramwaj",
        id: 10606,
      },
      {
        name: "Kleczkowska Autobus",
        id: 10706,
      },
    ])
    .then((data) => res.send(data))
    .catch(console.log);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
