const express = require('express');
const app = express();
require('dotenv').config();

const routes = require('./src/routes/routes');

const port = process.env.PORT;

app.get('/',(request,response) => {
    response.send("Server Healthy")
})

app.use(express.json());
app.use('/todos',routes);



app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})

