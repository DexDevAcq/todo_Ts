const express = require("express");
const cors = require('cors');
const PORT = 8000
const todoRouter = require('./routes/todoRouter');

const app = express();

app.use(cors())
app.use(express.json())

app.use('/api/v1/', todoRouter);


app.listen(PORT, () => {
    console.log(`Server has started on ${PORT}`)
});