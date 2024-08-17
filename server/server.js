require('dotenv').config();
const express = require('express');
const connectDB = require('./utils/db');
const userRoutes = require('./router/user-router');
const problemRoutes = require('./router/problem-router');
const cors = require("cors");
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, HEAD,DELETE",
    credentials: "true",
    optionsSuccessStatus: 200,
}

app.use('/api/users', userRoutes);
app.use('/api/problem', problemRoutes);

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running on port ${port}...  http://localhost:${port} `);
    })
})