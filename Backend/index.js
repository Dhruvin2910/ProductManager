const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(cors());

app.get("/test", (req, res) => {
    res.send("Test successfull...");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})