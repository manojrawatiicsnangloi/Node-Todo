const express = require("express");
const cors = require("cors");
const deserializeUser = require("./src/middleware/deserializerUser");
const connectionFunc = require("./src/db/connections");
const routeFunc = require("./src/routes")
const app = express(); 

app.use(deserializeUser);

app.use(express.json());
app.use(express.urlencoded());
app.use(cors(
    {
        origin : "*"
    }
));

const PORT = 3000;

app.listen(PORT, ()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    connectionFunc();
    routeFunc(app);
});