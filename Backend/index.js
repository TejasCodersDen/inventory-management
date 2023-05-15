const express = require('express');
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')
const path = require('path')
const app = express();
const PORT = 3001;

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(express.json());
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,and App is listening on port "+ PORT)
    else 
        console.log("Error occurred, server can't start", error);
    }
);

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/home', express.static(path.join(__dirname, 'build')))
require('./endpoints')(app);