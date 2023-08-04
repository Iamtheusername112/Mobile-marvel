const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
const phonesData = require("./data/phones.json");
app.get("/phones", (req, res) => {
  res.json(phonesData);
});

app.get("/phones/:id", (req, res) => {
  const phoneId = parseInt(req.params.id, 10);
  const phone = phonesData.find((phone) => phone.id === phoneId);
  if (!phone) {
    return res.status(404).json({ message: "Phone not found" });
  }
  res.json(phone);
});

const PORT = 7000;

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
