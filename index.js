const express = require('express');
const app = express();
const userRouter = require('./routers/user.routers');
const dbModel = require('./models/db.model');

app.use('/users', userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000...');
})