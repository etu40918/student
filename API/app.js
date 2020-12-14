const express = require('express');
const cors = require('cors');
const Router = require('./routes');

require('dotenv').config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(Router);


app.listen(port, () => {
    console.log(`The app is listening at http://localhost:${port}`)
});
