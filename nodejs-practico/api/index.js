const express = require('express');

const config = require('../config');
const {userRouter} = require('./components/user');

const app = express();
app.use('/api/user', userRouter);

app.listen(config.port, () => {
    console.log(`El servidor esta corriendo en el puerto ${config.port}`);
});